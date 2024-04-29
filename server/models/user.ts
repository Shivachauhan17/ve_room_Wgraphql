import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:{
        type:String,
        required:true
    },
    createdAt:String
})

const User = mongoose.model('User', userSchema)

export default User