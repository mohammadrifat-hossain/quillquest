import AuthModel from '@/models/AuthModel'
import PostModel from '@/models/PostModel'
import ImageUpload from '@/utils/ImageUploade'
import connectDB from '@/utils/connectDB'
import { NextResponse } from 'next/server'
export const POST = async (req) =>{
    
    try {
        const form = await req.formData()
        const value = form.get('value')
        const image = form.get('image')
        const userName = form.get('userName')
        const userId = form.get('userId')
        const title = form.get('title')
        const myId = form.get('myId')

        await connectDB()
        const data = await ImageUpload(image,'next_blog_images')

        const uploadedData = await PostModel.create({
            userId,
            userName,
            title,
            content: value,
            imageUrl: data.url
        })
        if(uploadedData){
            await AuthModel.findOneAndUpdate({_id:myId},{
                $push: { posts: uploadedData}
            })
        }
        return NextResponse.json({message:"upload success",data})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error.message})
    }
}
