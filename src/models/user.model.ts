import { Document, Model, Schema, model } from "mongoose";

export interface IUser extends Document {
    emailId: string,
    userName : string,
    password: string,
    refreshToken: string,
}


const userSchema = new Schema({
    emailId: { type: String, unique: true, trim: true, required: true },
    userName: { type: String, trim: true, unique: true, sparse: true },
    refreshToken: { type: String },
    password: { type: String },
}, 
{ timestamps: true }).index({ contactNumber: 1 }, 
{ sparse: true }
)



export const User: Model<IUser> = model<IUser>('User', userSchema);