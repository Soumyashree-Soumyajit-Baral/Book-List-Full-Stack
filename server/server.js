require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cors=require("cors")
const {existUser, genPassHash}=require("./utility/utility")
const userModel=require("./models/usermodel")
const bookModel =require("./models/bookmodel")


const app=express()
const unProtectedRoutes=["/signup","/login"]
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use((req,res,next)=>{
    if(unProtectedRoutes.includes(req.url)){
        next()
    }else{
        if(req.headers.authorization){
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY, (err,uname)=>{
                if(err){
                    return res.sendStatus(403)
                }
                req.uname=uname
                next();
            })
        }else{
            res.send("Authorization required")
        }
    }
})

const port=process.env.PORT || 3001
app.listen(port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`connected to port ${port}`)
    }
})

mongoose.connect("mongodb://localhost/bookmark",()=>{
    console.log("connected to db")
},(err)=>{
    console.log(err)
})


app.post("/signup",async(req,res)=>{
    if(await existUser(req.body.username)){
        res.status(400).send("User already present.")
    }else{
        genPassHash(req.body.password).then((passwordHash)=>{
            userModel.create({
                username:req.body.username,
                password:passwordHash
            }).then(()=>{
                res.status(200).send("user added sucessfully")
            }).catch((err)=>{
                res.status(400).send(err.message)
            })
        })
    }
})

app.post("/login",(req,res)=>{
    userModel.find({username:req.body.username}).then((udata)=>{
        if(udata.length){
            bcrypt.compare(req.body.password,udata[0].password).then((val)=>{
                if(val){
                    const authToken=jwt.sign(udata[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken})
                }else{
                    res.status(400).send("invalid password")
                }
            })
        }else{
            res.status(400).send("unauthorized user")
        }
    })
})

app.get("/books", async (req, res) => {
    try {
      const user = req.uname;
      const data = await bookModel.find({ user });
      const booksdata = data.map((d) => d.books);
      res.status(200).send(...booksdata);
    } catch {
      res.status(400).send("An error occured while getting data");
    }
  });

app.post("/books",async(req,res)=>{
    const user = req.uname;
    const data=req.body
    const isUser=await bookModel.find({user:user});
    if(isUser.length){
        const bookdata=isUser.map((d)=>d.books)
        const oldData=bookdata[0]
        const newData=[...oldData, data]
        bookModel.updateOne({user:user}, {books:newData}).then(()=>{
            res.status(200).send("added sucessfully")
        }).catch((err)=>{
            res.send(err.message)
        })
    }else{
        bookModel.create({
            user:user,
            books:data
        }).then(()=>{
            res.status(200).send("book added sucessfully")
        })
    }
})