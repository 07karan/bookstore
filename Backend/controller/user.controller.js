import Contact from "../model/contact.model.js";
import Problem from "../model/problem.model.js";
import User from "../model/user.model.js";
import sendEmail from "../utils/sendEmail.js";
import otpGenerator from "otp-generator";
import twilio from 'twilio';
import dotenv from 'dotenv'
import isOtpExpired from "../utils/verifyotp.js";

dotenv.config();

const account_sid = process.env.ACCOUNT_SID_TWILIO;
const authToken = process.env.AUTHTOKEN_TWILIO;
const mobilenumber = process.env.MOBILE_NUMBER_TWILIO;

const client=new twilio(account_sid,authToken);



export const signup = async(req, res) => {
    try {
        const { fullname, email, password,phone } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password,
            phone
        });
        
        await createdUser.save();
        const url=`http://localhost:5173`
        const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to BookStore Application</title>
        </head>
        <body>
            <h1>Welcome to BookStore Application!</h1>
            <p>
                Dear ${createdUser.fullname},
            </p>
            <p>
                We are thrilled to have you join our community.
            </p>
            <p>
                At BookStore Application, we are committed to Purchase The Free books. We're here to support you every step of the way.
            </p>
            <p>
                Connect with others: Join discussions, follow topics of interest, and connect with other members.
            </p>
            <p>
                If you have any questions or need assistance, don't hesitate to reach out to us at vishal90904545@gmail.com,karanamarchavan@gmail.com
            </p>
            <p>
                Once again, welcome to BookStore Application! We hope you enjoy your experience with us.
            </p>
            <p> Please Visit Our Website <a href=${url}>${url}</a></p>
            <h2>Best regards,<br>Bookstore Application</h2>
        </body>
        </html>
`;
        
        await sendEmail({
          to: createdUser.email,
          subject: "Welcome To Bookstore Application..!!",
          text: message,
        });
        res.status(201).json({
            message: "User created successfully Please Check Your Email..!!",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
            
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const login = async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = user.genereteToken();
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal Server Error..!!" });
  }


};


export const contact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    let existingContact = await Contact.findOne({ email });
    if (!existingContact) {
      existingContact = await Contact.create({ fullname, email });
    }
    existingContact.messages.push({ message });
    await existingContact.save();

    res
      .status(200)
      .json({ message: "Message added successfully", data: existingContact });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const forgetpassword = async (req, res, next) => {
    try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User Not Found In Database..!!" });
    }
    //if u want to send link with the resetpasswordtoken u can uncomment this line and generate the resetToken 
    // const resetToken = user.getResetPasswordToken();
    await user.save();
    const resetUrl = `http://localhost:5173/resetPassword/${user._id}`;
    const message = `
      <h1> You Have Requested a Password Reset </h1>
      <p>Please go to this link to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      return res.status(200).json({ message: "Email sent successfully"});
    } catch (error) {
      // user.resetPasswordToken = undefined;
      // user.resetPasswordExpire = undefined;
      await user.save();
      console.error("Error sending email:", error);
      return res
        .status(500)
        .json({ message: "Email could not be sent. Please try again later." });
    }
  } catch (error) {
    console.error("Error in forgetpassword function:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const resetpassword = async (req, res, next) => {
  // const resetPasswordToken = req.params.resetToken;
  const {id}=req.params;

  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User Not Found..!!" });
    }

    user.password = req.body.password;
    // user.resetPasswordToken = undefined;
    // user.resetPasswordExpire = undefined;

    await user.save();

    return res
      .status(200)
      .json({ message: "Password Reset Successful..!!", data: user });
  } catch (error) {
    next(error);
  }
};


export const problem=async(req,res)=>{
  try {
    const { fullname, email, message } = req.body;
    console.log(req.body);
    let existingContact = await Problem.findOne({ email });
    if (!existingContact) {
      existingContact = await Problem.create({ fullname, email ,message:[]});
    }
    existingContact.messages.push({ message });
    await existingContact.save();
    const mess = `
      <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Error Notification</title>
        </head>
        <body>
            <h2>Subject: Login Error Notification</h2>
            <p>Dear Vishal,</p>
            <p>There was an error encountered during the login process on the website. Below are the details of the error:</p>
            <ul>
                <li><strong>User Information:</strong> ${fullname}</li>
                <li><strong>User Message:</strong> ${message}</li>
            </ul>
            <p>Please investigate this issue and take necessary actions to resolve it.</p>
            <p>Best regards,<br>${fullname}</p>
        </body>
        </html>

    `;
    await sendEmail({
      from :`${email}`,
      to: "vishalpote90904545@gmail.com",
      subject: "Login Error Notification..!!",
      text: mess,
    });

    res
      .status(200)
      .json({ message: "Message added successfully", data: existingContact });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const sendotp=async(req,res)=>{
  try {
    const {phone}=req.body;
    if(!phone){
      return res.status(400).json({message:"Please Enter a phone number..!!"});
    }
    const Otp = otpGenerator.generate(4, {
      upperCase:false,
      lowerCaseAlphabets:false, //
      upperCaseAlphabets:false, //
      specialChars:false, //
    });
    const cDate=new Date();
    const user=await User.findOneAndUpdate(
      {phone},
      {otp:Otp,otpExpiration:new Date(cDate.getTime())},
      {upsert:true,setDefaultsOnInsert:true,new:true},
    )
    
    // const resetToken = user.getResetPasswordToken();
    await user.save();
    client.messages.create({
      body: `Your OTP Is : ${Otp}`,
      to: phone,
      from: mobilenumber,
    });
    return res
      .status(200)
      .json({
        message: "OTP Send Successfully..!!",
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..",error});
  }
}


export const verifyotp=async(req,res)=>{
  try {
    const {phone,OTP}=req.body;

    const otpData=await User.findOne({phone});
    console.log(otpData);
     
    
    if(!otpData){
      return res.status(403).json({message:"Invalid OTP"});
    }

    const IsotpExpired = await isOtpExpired(otpData.otpExpiration);

    if(IsotpExpired){
      return res.status(401).json({ message: "Your OTP Has Been Expired..!!" }); 
    }
    if(otpData.otp===OTP){
      
      return res
        .status(200)
        .json({ message: "OTP IS VERIFIED SUCCESSFULLY..!!", otpData });
    }else{
      return res.status(401).json({message:"Invalid OTP"});
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error..",error});
  }
}