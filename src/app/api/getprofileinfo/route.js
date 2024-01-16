import AuthModel from "@/models/AuthModel"
import { sign } from "jsonwebtoken"
import { NextResponse } from "next/server"


export const POST = async (req) =>{

    
    const {userId} = await req.json()
    try {
        const myProfile = await AuthModel.findById(userId)
        
        return NextResponse.json({info:myProfile})

        
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message})
    }
}