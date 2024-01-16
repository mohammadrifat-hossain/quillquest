import AuthModel from "@/models/AuthModel"
import ImageUpload from "@/utils/ImageUploade"
import { sign } from "jsonwebtoken"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    try {
        const form = await req.formData()
        const image = form.get('image')
        const userId = form.get('userId')
        const data = await ImageUpload(image,"next_blog_profile")

        const userData = await AuthModel.findByIdAndUpdate(userId,{
            image : data.url
        })

        //generate token
        const token = sign({
            id:userData._id,
            name:userData.name,
            username:userData.username,
            email:userData.email,
            posts:userData.posts,
            image: data.url,
            following: userData.following,
            followers: userData.followers,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
        },"RIFATMOHONA")

        return NextResponse.json({message:"upload success",token})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message})
    }
}