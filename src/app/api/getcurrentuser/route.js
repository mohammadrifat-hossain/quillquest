import AuthModel from "@/models/AuthModel"
import { NextResponse } from "next/server"


export const POST = async (req) =>{
    const {userId } = await req.json()
    
    try {
        const user = await AuthModel.findById(userId)

        return NextResponse.json({user})
    } catch (error) {
        
    }
}