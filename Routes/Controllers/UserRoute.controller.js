import { validationResult } from "express-validator";
import {User} from "../../Models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import sendMail from "../../moduls/sendMail.js"

let user = {};
let verificationCode = null;
let thisEmail = "";

export async function dataCheck(req,res){
  try
  {
    const { username, password, email } = req.body

    //validation
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ error: errors.array()[0].msg });
    }

    //search data
    let data = await User.findOne({username})
    if( data ){
        return res.status(200).json( { error:'This name already taken' } )
    }

    //search data
    data = await User.findOne({ email })
    if( data ){
        return res.status(200).json( { error:'This email already taken' } )
    }

    //create user
    const HashPassword = await bcrypt.hash( password, 7 )

    user = await new User({ username, email, password: HashPassword, nickname: "", avatar: "" })
    
    verificationCode = String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10));

    await sendMail("Chgidem.am", email, "Verification Code", String(verificationCode), String(verificationCode))

    return res.status(200).json( { ok: true, message: 'Data is correct' } )
  }
  catch(e)
  {
      return res.json( { error:e } )
  }
}

export async function registration(req,res){
  try
  {
    const { code } = req.body

    //validation
    if (code !== verificationCode) {
      return res.status(200).json({ error: "Code is incorrect" });
    }

    await user.save();

    const token = await jwt.sign( { userId:user._id},process.env.secret,{  expiresIn: '10d', } )
    verificationCode = null;
    return res.status(200).json( { ok: true, message: 'User Created',token } )
  }
  catch(e)
  {
      return res.json( { error:e } )
  }
}

export async function login(req,res){
    try
    {
        const {email,password} = req.body

        // validation
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({ error: errors.array()[0].msg });
        }

        //find user
        const data = await User.findOne({email})
        if( !data ){
            return res.status(200).json({
                error:"user not found"
            })
        }

        //check password
        const hash = data.password;
        const CheckPassword =await  bcrypt.compare( password,hash )
        if( !CheckPassword ){
            return res.status(200).json({
                error:"user not found"
            })
        }

        //create token
        const token = await jwt.sign( { userId:data._id},process.env.secret,{  expiresIn: '10d', } )
        return res.status(200).json({
            token,
            ok:true
        })

    }
    catch(e)
    {
        return res.json( { error:e } );
    }
}

export async function forgetPassword(req,res){
    try
    {
        const {email} = req.body

        // validation
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({ error: errors.array()[0].msg });
        }
    
        const candidate = await User.findOne({ email })

        if(!candidate)
        {
            return res.status(200).json({ error: "Dont get user with email: " + email });
        }
        verificationCode = String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10)) + String(Math.floor(Math.random() * 10));

        thisEmail = email;
        
        await sendMail("Chgidem.am", email, "Verification Code", String(verificationCode), String(verificationCode))

        return res.status(200).json( { ok: true, message: 'Data is correct' } )
    }
    catch(e)
    {
        return res.json( { error:e } );
    }
}

export async function changePassword(req,res){
    try
    {
        const {password} = req.body

        // validation
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(200).json({ error: errors.array()[0].msg });
        }

        if(password !== req.body.changePassword)
        {
          return res.status(200).json({ error: "confirm password is not similar" });
        }
    
        const HashPassword = await bcrypt.hash( password, 7 )

        user.password = HashPassword;
        await user.save();
        verificationCode = null;
        return res.status(200).json( { ok: true, message: 'User Changed' } )
    }
    catch(e)
    {
        return res.json( { error:e } );
    }
}


export async function goToChange(req,res){
    try
    {
      const { code } = req.body
  
      //validation
      if (code !== verificationCode) {
        return res.status(200).json({ error: "Code is incorrect" });
      }
  
      user = await User.findOne({ email: thisEmail })
      
      return res.status(200).json( { ok: true, message: 'Code is correct' } )
    }
    catch(e)
    {
        return res.json( { error:e } )
    }
  }

export async function getUser(req,res){
    try
    {
        const { token } = req.params;
        const userid = await jwt.verify(token,process.env.secret)
        const data = await User.findOne({_id: userid.userId})
        return res.json({username:data.username,email:data.email,nickname:data.nickname,avatar: data.avatar})
    }catch(e)
    {
        res.json({ error: e })
    }
}

