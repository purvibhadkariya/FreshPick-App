import { JWT_EXPIRY, JWT_REFRESH_EXPIRY, JWT_REFRESH_SECRET, JWT_SECRET } from "../config";
import { IUser, User } from "../models/user.model"
import { Types } from "mongoose";
import Jwt from 'jsonwebtoken'
import path from "path";
import fs  from "fs";
import { storeAttachment } from "./attachment.service";

export const login = async (emailId: string, password: string) =>{
    const user = await User.findOne({ emailId: emailId});
    if(user){
        if(user.password === password){
            const [token, refreshToken] = await generateTokens(user)
            await setRefreshToken(user._id as Types.ObjectId, refreshToken)

            return ({
                token: token,   
                refreshToken: refreshToken,
                user: user
            })

        }else{
            throw new Error("invalid Password. please try again")
        }
    }else{
        throw new Error("User not found")
    }
}

export const signup = async (req: any, userName: string, emailId: string, password:string) => {
    const isExists = await checkUserExists(emailId);
    const isUserNameTaken = await checkUserNameExists(userName);
    if(isExists){
        throw new Error("User already Exists..")
    }

    if(isUserNameTaken){
        throw new Error("UserName already taken. Try something")
    }

    const user = await User.create({userName: userName, emailId: emailId, password: password})
    const [ token, refreshToken] = await generateTokens(user)
    await setRefreshToken(user._id as Types.ObjectId, refreshToken)
    
    return ({
                token: token,
                refreshToken: refreshToken,
                user: user,
            })

}

export const checkUserNameExists = async (userName: string) => {
    const user = await User.exists({ userName: userName });
    if (user) return true;
    return false;
}


export const checkUserExists = async (emailid: string) => {
    const user = await User.exists({ emailId: emailid });
    if (user) return true;
    return false;
}



export const getJwtToken = (user: IUser, jwtSecret: string, jwtExpiry: string) => {
    const payload = {
        id: user._id,
        emailId: user.emailId,
    }
    return Jwt.sign({ ...payload }, jwtSecret, { expiresIn: jwtExpiry })
}

const   setRefreshToken = async (userId: Types.ObjectId, refreshToken: string) => {
    await User.findByIdAndUpdate(userId, {
        $set: { refreshToken: refreshToken }
    })
}

const  generateTokens = async (user: IUser) => {
    const token = getJwtToken(user as IUser, JWT_SECRET, JWT_EXPIRY);
    const refreshToken = getJwtToken(user as IUser, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRY);
    return [token, refreshToken]
}

export const getUserDetailsById = async (userId: string) => {
    return User.findById({ _id: userId }).lean();
}