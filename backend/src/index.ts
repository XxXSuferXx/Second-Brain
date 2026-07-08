import express from 'express';
import {safeParse, z} from 'zod';
import type {Request, Response} from "express";
import mongoose, {Types} from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {UserModel} from "./db.js";
import { authMiddleWare } from './middleware.js';
import { ContentModel} from './db.js';
import { LinkModel } from './db.js';
import {random} from './utils.js';

dotenv.config();

await mongoose.connect(process.env.DB_URL as string);

const app = express();

app.use(express.json());

const signUpSchema = z.object({
    username: z
    .string()
    .min(3, {message: 'Username should be atleast 3 characters long.'})
    .max(10, {message: 'Username cannot exceed 10 characters.'}),

    password: z
    .string()
    .min(8, {message: 'Password should be atleast 8 characters long.'})
    .max(20, {message: 'Password cannot exceed 20 characters.'})
    .regex(/[A-Z]/, {message: 'Password should contain atleast one uppercase letter.'})
    .regex(/[a-z]/, {message: 'Password should contain atleast one lowercase letter.'})
    .regex(/[^A-Za-z0-9]/, {message: 'Password should contain atleast one special character.'})
})

const signInSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(1, { message: "Password is required" })
});

app.post("/api/v1/signup", async (req: Request, res: Response) =>{

    const signupData = signUpSchema.safeParse(req.body);

    if(!signupData.success) {
       const errorMessages = signupData.error.issues.map(error => ({
      field: error.path[0],
      message: error.message
    }));

        res.status(411).json({
        success: false,
        errors: errorMessages
        });
        return;
    }
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({
            username: username
        })
        // Check if user is already in the database
        if(user) {
            res.status(403).json({
                success: false,
                message: "User already exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            username,
            password: hashedPassword
        })

        res.status(200).json({
            success: 'true',
            message: 'User successfully registered!'
        });
    } catch (error) {
        console.error("Signup Server Error: ", error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error. Something went wrong on our end."
        })
    }
});

app.post("/api/v1/signin", async (req: Request, res: Response) =>{

    const signinData = signInSchema.safeParse(req.body);

    if(!signinData.success) {
        res.status(400).json({
            success: false,
            message: "Invalid Input data fields"
        });
        return;
    }

    try {
        const {username, password} = req.body;

        const user = await UserModel.findOne({
            username
        })

        if(!user) {
            res.status(403).json({
                success: false,
                message: "Wrong Username or Password"
            })
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            res.status(403).json({
                success: false,
                message: "Invalid username or password"
            });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret || jwtSecret === undefined) {
            throw new Error("JWT_SECRET is not defined in your environment variables.");
        }

        const token = jwt.sign({
                userId: user._id,
                username: user.username
            },jwtSecret)
        
        res.status(200).json({
            success: true,
            message: "Successfully signed In!",
            token: token
        })

    } catch(error) {
        console.error("Signin server error: ", error)
        res.status(500).json({
            success: false,
            message: "Internale server error"
        })
    }

})

app.post("/api/v1/content", authMiddleWare ,async (req: Request, res: Response) =>{
    try {
        const {type, link, title, tags} = req.body;

        if (!type || !link || !title) {
            return res.status(400).json({
                message: "Missing required fields"
            })
        }

        if(type !== 'document' && type != 'tweet') {
            return res.status(400).json({
                message: "Invalid type"
            })
        }

        const userId = (req as any).userId;

        const newContent = await ContentModel.create({
            type,
            link,
            title,
            tags: tags || [],
            userId : userId
        });

        return res.status(201).json({
            message: "Content added successfully",
            data: newContent
        });

    } catch(error: any) {
        return res.status(500).json({
            message: "Failed to add content ",
            error: error.message
        })
    }
})

app.get("/api/v1/content", authMiddleWare, async (req: Request, res: Response) =>{
    try{
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: new Types.ObjectId(userId)
//with populate we will get the userId as well as the actual content of userId
//the second argument is select, agr mention nhi kiya then it will get even password as well
        }).populate("userId", "username"); 
        res.json({
            content
        });
    } catch(error) {
        return res.status(500).json({
            message: "Internal Server Error while retreiving the content"
        })
    }
})  

app.delete("/api/v1/delete", authMiddleWare, async (req: Request, res: Response) => {
    try{
        const {contentId} = req.body.contentId;
        const userId = req.userId;

        if(!contentId) {
            return res.status(400).json({
                success: false,
                message: "Content ID is required in the request body"
            });
        }

        const result = await ContentModel.deleteOne({
            _id: new Types.ObjectId(contentId),
            userId: new Types.ObjectId(userId)
        })

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Content not found, or you do not have permission to delete it."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Content deleted successfully."
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server error occurred while trying to delete the content."
        })
    }
})

app.post("/api/v1/brain/share", authMiddleWare, async (req: Request, res: Response) => { 
    try{
        const share = req.body.share;
        const hash = random(10);
        if(share) {
            const existingLink = await LinkModel.findOne({
                userId: req.userObjectId
            })
            if(existingLink) {
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            await LinkModel.create({
                userId: req.userId as any,
                hash: hash
            })
            res.json({
                message: "/share/" + hash
            })
        } else {
            await LinkModel.deleteOne({
                userId: req.userId as any
            })
        }
        res.json({
            message: "Updated sharable link"
        })
    } catch(error) {
        res.status(500).json({
            message: "Internal Server Error while sharing the link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req: Request, res: Response) => {
    const hash = req.params.shareLink as string;

    const link = await LinkModel.findOne({
        hash
    });

    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }
    const content = await ContentModel.findOne({
        userId: link.userId 
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

    if(!user) {
        res.status(411).json({
            message: "Error! User not found"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})