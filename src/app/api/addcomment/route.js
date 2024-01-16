import PostModel from "@/models/PostModel"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    const {comment, userInfo, contentid, username} = await req.json()
    
    try {
        await connectDB()
        await PostModel.findByIdAndUpdate(contentid,{
            $push:{comments:{userInfo,comment,username,addedat:Date.now()}}
        })
        
        return NextResponse.json({message:"Comment added"})
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}