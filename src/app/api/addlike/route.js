import PostModel from "@/models/PostModel"
import { NextResponse } from "next/server"

export const POST = async (req) =>{
    const {userId,contentid} = await req.json()
    
    try {
        const content = await PostModel.findById(contentid)

        const liked = content?.likes.filter((item) => item.userid === userId)

        if(liked.length > 0){
            await PostModel.findByIdAndUpdate(contentid,{
                $pull:{likes:{userid:userId}}
            })
            return NextResponse.json({message: "Like removed"})
        }else{
            await PostModel.findByIdAndUpdate(contentid,{
                $push:{likes:{userid:userId}}
            })
            return NextResponse.json({message: "Like added"})
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message: error.message})
    }
}