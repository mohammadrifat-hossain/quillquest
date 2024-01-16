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
    likes:{
        type: Array,
        default:[]
    },
    comments:{
        type: Array,
        default:[]
    },
    imageUrl:{
        type: String,
        required: true
    },
},{timestamps: true})

schema.index({
    title: 'text',
    content: 'text',
    comments: 'text',
},{
    weights:{
        title: 5,
        content: 4,
        comments: 3,
    }
});

const PostModel = mongoose.models.nextpostcontents || mongoose.model('nextpostcontents', schema)

export default PostModel