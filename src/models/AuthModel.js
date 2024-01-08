import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    posts:{
        type: Array,
        default: [],
    },
},{timestamps: true})

const AuthModel = mongoose.models.nextblogusers || mongoose.model('nextblogusers', schema)

export default AuthModel