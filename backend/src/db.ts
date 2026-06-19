import {model, Schema, Types} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true}
});

export const UserModel = model("User", UserSchema);

const contentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ['document', 'tweet'], required: true }, 
    tags: [{ type: Types.ObjectId, ref: 'Tag' }], 
    userId: { type: Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = model("Content", contentSchema);