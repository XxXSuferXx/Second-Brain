import express from 'express';
import {safeParse, z} from 'zod';
import type {Request, Response} from "express";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {UserModel} from "./db.js";

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
    username: z.string(),
    password: z.string()
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
                success: true,
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

app.post("/api/v1/content", (req: Request, res: Response) =>{
    
})

app.get("/api/v1/content", (req: Request, res: Response) =>{
    
})  

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
})