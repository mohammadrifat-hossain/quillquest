import AuthModel from "@/models/AuthModel"
import { sign } from "jsonwebtoken"
import { NextResponse } from "next/server"


export const POST = async (req)=>{
    const {authorId, myId} = await req.json()

    try {
        const myInfo = await AuthModel.findById(myId)

        const alreadyHave = myInfo.following.some((item)=> item._id.includes(authorId))

        const authorInfo = await AuthModel.findById(authorId)

        if(alreadyHave.length > 0){
            return NextResponse.json({message:"Already Following"})
        }else{
            const updated = await AuthModel.findByIdAndUpdate(myId,{
                $push:{following: authorInfo}
            })
            await AuthModel.findByIdAndUpdate(authorId,{
                $push:{followers: myInfo}
            })

            //generate token
            const token = sign({
                id:updated._id,
                name:updated.name,
                username:updated.username,
                email:updated.email,
                posts:updated.posts,
                image: updated.image,
                following: updated.following,
                followers: updated.followers,
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7
            },"RIFATMOHONA")
            
            return NextResponse.json({message:"Started Following",token})
        }
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message})
    }
}