import connectDB from "@/utils/connectDB"
import AuthModel from "@/models/AuthModel"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

export const POST = async (req) =>{
    const {name, email, password} = await req.json()

    try {
        await connectDB()
        const findUser = await AuthModel.findOne({email})
        const buildUsername = name.toLowerCase().replace(/\s/g, '')
        if(findUser){
            return NextResponse.json({message:"User already exists"})
        }else{
            const hanshedPass = await bcrypt.hash(password,10)
            const data = await AuthModel.create({
                name,
                username: buildUsername,
                email,
                password: hanshedPass
            })

            const token = sign({
                id:data._id,
                name:data.name,
                username:data.username,
                email:data.email,
                posts:data.posts,
                image: data.image,
                following: data.following,
                followers: data.followers,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
            },"RIFATMOHONA")

            return NextResponse.json({token,message:"Register success"})
            
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: error.message})
    }
}