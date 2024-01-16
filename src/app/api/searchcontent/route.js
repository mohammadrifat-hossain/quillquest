import PostModel from "@/models/PostModel"
import { NextResponse } from "next/server"

export const POST = async (req)=>{
    const body = await req.json()
    
    try {
        if(body){
            const data = await PostModel.find({
                $text:{
                    $search: body
                }
            })
            if(data){
                return NextResponse.json({data,success:true})
            }else{
                return NextResponse.json({success:true})
            }
        }else{
            return NextResponse.json({success:true})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false})
    }
}