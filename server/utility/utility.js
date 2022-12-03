const userModel=require("../models/usermodel")
const bcrypt=require("bcrypt")

const existUser=async(uname)=>{
    let exist=false
    userModel.find({username:uname}).then((data)=>{
        if(data.length){
            exist=true
        }
    })
    return exist;
}

const genPassHash=(password)=>{
    const salt=10
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(salt).then((hashSalt)=>{
            bcrypt.hash(password, hashSalt).then((passHash)=>{
                resolve(passHash);
            })
        })
    })
}

module.exports={existUser, genPassHash}