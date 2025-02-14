import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password: {
        type:String,
        required:true,
        minLength: [8,"Password should be greater than 8 characters"],
        select:false,
    },
    refreshToken: {
        type:String,
        select:false
    }
},{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password"))return next();
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

//generating access and refresh token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this.id,
            name:this.userName,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
          _id:this.id
        },
        process.env.REFRESH_TOKEN_SECRET,
       {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
       }
    )
}

export const User = mongoose.model("User",userSchema)