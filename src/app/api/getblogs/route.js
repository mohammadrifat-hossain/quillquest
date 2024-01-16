import PostModel from "@/models/PostModel"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    try {
        await connectDB()
        const data = await PostModel.find()
        return NextResponse.json({data});
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({success:false});
    }
}