import express, { type Request, type Response } from "express";
import { UserModal } from "./db.js";

let app = express()
app.use(express.json())

app.post("/api/v1/signup", function(req:Request, res:Response){
    // password hashing
    // zod validation
    // password validations
    // error handling
    let {username, password} = req.body;
    UserModal.create({
        username, password
    })
    res.json({
        message:"Done!"
    })
})

app.post("/api/v1/signin", async function(req:Request, res:Response){
    let {username, password} = req.body;
    let response = await UserModal.findOne({
        username, password
    })
    if(response){
        res.json({
            message: "You are Signed Up!"
        })
    }else{
        res.json({
            message: "Incorrect creds!"
        })
    }
})

app.listen(3000);