import { Document, Model, Schema, model } from "mongoose";
import { IUser } from "./user.model";
import { IBlog } from "./blog.model";


export interface IComment extends Document {
   message: string, 
   user: IUser,
   blog: IBlog,
   replyId: IComment
}

const commentSchema = new Schema({
    message: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', index: true },
    replyId: { type: Schema.Types.ObjectId, ref: 'Comment', index: true },
}, { timestamps: true }).index({ message: 1 }, { sparse: true })



export const Comment: Model<IComment> = model<IComment>('Comment', commentSchema);