const userSchema = require("../models/UserModel")
const Seller = require("../models/SellerModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtil")
const jwt = require("jsonwebtoken")
const secret = "secret"

const registerUser = async(req,res)=>{
    try{
        const { fullName,email,password,role,sellerType,companyName }= req.body
        const existingUser = await userSchema.findOne({email})
        if(existingUser){
          return res.status(400).json({
            message:"User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const savedUser = await userSchema.create({fullName,email,password:hashedPassword,role: role || "user"})
        /*
    AUTO CREATE SELLER PROFILE
    */
    if (savedUser.role === "seller") {

      const existingSeller = await Seller.findOne({
      userId: savedUser._id
  })

    if(!existingSeller){
      await Seller.create({
        userId: savedUser._id,
        companyName: companyName || "",
        sellerType: sellerType || "dealer",
        verificationStatus: false
    })
  }

}
        //savedUser.password = undefined

        const htmlMessage = `
<div style="background:#f4f6fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
  
  <table align="center" width="600" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
    
    <tr>
      <td style="background:#2563eb;color:white;padding:20px;text-align:center;">
        <h1 style="margin:0;">🚗 Car Scout</h1>
        <p style="margin:0;font-size:14px;">Smart Car Marketplace</p>
      </td>
    </tr>

    <tr>
      <td style="padding:30px;">
        <h2 style="color:#111;">Welcome, ${fullName}! 🎉</h2>

        <p style="color:#555;font-size:15px;">
          Thank you for joining <b>Car Scout</b>. Your account has been successfully created.
        </p>

        <p style="color:#555;font-size:15px;">
          Now you can explore thousands of cars, compare prices, and find the best deals easily.
        </p>

        <div style="text-align:center;margin:30px 0;">
          <a href="http://localhost:5173/"
            style="background:#2563eb;color:white;padding:12px 25px;text-decoration:none;border-radius:6px;font-size:16px;font-weight:bold;">
            Login to Your Account
          </a>
        </div>

        <p style="color:#555;font-size:14px;">
          If you have any questions, feel free to contact our support team anytime.
        </p>

        <p style="margin-top:30px;color:#555;font-size:14px;">
          Best regards,<br>
          <b>Car Scout Team</b>
        </p>
      </td>
    </tr>

    <tr>
      <td style="background:#f4f6fb;text-align:center;padding:15px;font-size:12px;color:#777;">
        © 2026 Car Scout. All rights reserved.<br>
        This is an automated email. Please do not reply.
      </td>
    </tr>

  </table>

</div>
`

        await mailSend(
          savedUser.email,
         "Welcome to Car Scout",
          htmlMessage
        )
        res.status(201).json({
            message:"user created successfully",
            data:savedUser
        })

    }
    catch(err){
        res.status(500).json({
            message:"error while creating user",
            err:err
        })

    }
}
const loginUser = async(req,res) =>{
    try{

        const {email,password} = req.body

        const foundUserFromEmail = await userSchema.findOne({email:email})

        if(!foundUserFromEmail){
            return res.status(404).json({
                message:"User not found"
            })
        }

        if(foundUserFromEmail.accountStatus !== "active"){
            return res.status(403).json({
                message:"Account is not active"
            })
        }

        const isPasswordMatched = await bcrypt.compare(password,foundUserFromEmail.password)

        if(!isPasswordMatched){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        //foundUserFromEmail.password = undefined
        const token = jwt.sign(
  {
    id: foundUserFromEmail._id,
    role: foundUserFromEmail.role
  },
  secret,
  { expiresIn: "1d" }
);

        res.status(200).json({
            message:"Login success",
            //data:foundUserFromEmail,
            token:token,
            role:foundUserFromEmail.role,
            userId: foundUserFromEmail._id 
        })

    }
    catch(err){
        res.status(500).json({
            message:"Error while logging in",
            err
        })
    }
}
module.exports = {
    registerUser,
    loginUser
}