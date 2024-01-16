import PostModel from "@/models/PostModel";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/utils/connectDB";

export const POST = async (req) =>{
    const {contentid} = await req.json()
    try {
        await connectDB()
        const data = await PostModel.findById(contentid).maxTimeMS(50000)
        return NextResponse.json(data)
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message: error.message})
    }
}