import mongoose from "mongoose"

const schema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.mongo.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
},{timestamps: true})

const PostModel = mongoose.models.nextpostcontents || mongoose.model('nextpostcontents', schema)

export default PostModel