import { Document, Model, Schema, model } from "mongoose";
import { ICategory } from "./category.model";
import { IAttachment } from "./attachment.model";
import { IUser } from "./user.model";


export interface IBlog extends Document {
    title: string,
    category: string,
    heroImg: IAttachment,
    description: string,
    author: IUser,
    slug: string
}


const blogSchema = new Schema({
    title: { type: String, unique: true, trim: true, required: true },
    heroImg: { type: Schema.Types.ObjectId, ref: 'Attachment', index: true },
    description: { type: String },
    slug: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String },
}, { timestamps: true }).index({ title: 1 }, { sparse: true })



export const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);