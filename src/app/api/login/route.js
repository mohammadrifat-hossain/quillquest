import connectDB from "@/utils/connectDB"
import AuthModel from "@/models/AuthModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export const POST = async (req) =>{
    const {email, password} = await req.json()
    try {
        await connectDB()
        const findUser = await AuthModel.findOne({email})
        if(!findUser){
            return NextResponse.json({message:"User does not exists"})
        }else{
            const hashedpass = await bcrypt.compare(password,findUser.password)
            if(hashedpass){
                const token = sign({
                    id:findUser._id,
                    name:findUser.name,
                    username:findUser.username,
                    email:findUser.email,
                    posts:findUser.posts,
                    image: findUser.image,
                    following: findUser.following,
                    followers: findUser.followers,
                    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
                },"RIFATMOHONA")
                return NextResponse.json({token,message:"login success"})
            }else{
                return NextResponse.json({message:"Wrong password"})
            }            
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error.message})
    }
}