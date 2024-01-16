import AuthModel from "@/models/AuthModel"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    
    try {
        await connectDB()
        const allAuthors = await AuthModel.find().maxTimeMS(50000)

        return NextResponse.json({authors:allAuthors})
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({sucess:false})
    }
}