import AuthModel from "@/models/AuthModel"
import connectDB from "@/utils/connectDB"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    const {myId} = await req.json()
    try {
        await connectDB()
        const data = await AuthModel.findById(myId)
        if(data){
            return NextResponse.json({posts:data.posts})
        }else{
            return NextResponse.json("")
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message})
    }
}