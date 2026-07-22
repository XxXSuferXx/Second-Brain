import {model, Schema, Types} from "mongoose";

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true}
});

const ContentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ['youtube', 'twitter'], required: true }, 
    tags: [{ type: Types.ObjectId, ref: 'Tag' }], 
    userId: { type: Types.ObjectId, ref: 'User', required: true }
});

export const LinkSchema = new Schema({
    hash: String,
    userId: { type: Types.ObjectId, ref: 'User', required: true, unique: true }
})

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Links", LinkSchema);