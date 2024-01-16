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
    following:{
        type: Array,
        default: [],
    },
    followers:{
        type: Array,
        default: [],
    },
    image:{
        type: String,
        default:"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1704794571~exp=1704795171~hmac=88093082f047638bd1b1754c9af354adc9ef898b1cf049f39ea4173b77a6b13d"
    }
    
},{timestamps: true})

const AuthModel = mongoose.models.nextblogusers || mongoose.model('nextblogusers', schema)

export default AuthModel