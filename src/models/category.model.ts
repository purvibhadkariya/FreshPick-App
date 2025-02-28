import { Document, Model, Schema, model } from "mongoose";
import { IAttachment } from "./attachment.model";


export interface ICategory extends Document {
   name: string,
   imgSrc: IAttachment
}


const categorySchema = new Schema({
    name: { type: String, unique: true, trim: true, required: true },
    imgSrc: { type: Schema.Types.ObjectId, ref: 'Attachment', index: true },
}, { timestamps: true }).index({ name: 1 }, { sparse: true })



export const Category: Model<ICategory> = model<ICategory>('Category', categorySchema);