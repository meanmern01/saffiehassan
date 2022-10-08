const UserData = require('../Model/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { request } = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//------------------------FOR CREATE TOKEN----------------------------

const extime = 30 * 24 * 60 * 60;
const genratetoken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: extime,
    });
};

//------------------------For Get User Details-------------------------------
exports.Userdata = async (req, res) => {
    try {
        const { name, userId, city } = req.body;
        console.log(req.body, '............body');
        const user = await UserData.findOne({ userId: userId });
        if (user) {
            return res.status(200).json({ code: 200, message: 'User found Successfully', user });
        }
        let token = await genratetoken(userId);
        await new UserData({ name, userId, city, token })
            .save()
            .then((result) => {
                return res.status(200).json({ code: 200, message: result });
            })
            .catch((error) => {
                return res.status(404).json({ code: 404, message: error.message });
            });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
};

exports.getData = async (req, res) => {
    try {
        const data = await UserData.find()
            .then((result) => {
                return res.status(200).json({ code: 200, message: result });
            })
            .catch((error) => {
                return res.status(404).json({ code: 404, message: error.message });
            });
    } catch (error) {
        return req.status(500).json({ code: 500, message: error.message });
    }
};
exports.Recommendation = async (req, res) => {
    try {
        const { Recommendation } = req.body;
        const user = await UserData.findOne({ userId: req.user.userId });
        await UserData.findOneAndUpdate(
            { userId: req.user.userId },
            { $set: { Recommendation: Recommendation } },
            { new: true },
        )
            .then((result) => {
                return res.status(200).json({ code: 200, message: 'Recommendation Update Successfully' });
            })
            .catch((error) => {
                return res.status(404).json({ code: 404, message: error.message });
            });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
};
//------------------------For Signup User-------------------------------
// exports.Signup = async (req,res)=>{
//     try {
//         const{username,email,password} = req.body;
//         if(!username || !email || !password){
//             return res.status(404).json({code:404,message:"Please fill the All the fields"});
//         }
//         if (!validator.isEmail(req.body.email)) {
//            return res.status(400).json({code:400,message :"Please enter a valid Email"});
//         }
//         const Username = await UserData.findOne({username:username}).lean().exec();
//         const Useremail = await UserData.findOne({email:email}).lean().exec();
//         if(Username){
//         return res.status(409).json({code:409,message:"Username is Already Exists"});
//         }
//         else if(Useremail){
//             return res.status(409).json({code:409,message:"Email is Already Exists"});
//         }else{
//             const strongPassword = new RegExp(
//                 "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
//             );
//             if (!strongPassword.test(password.trim())) {
//                 return res.status(422).json({
//                     code: 422,
//                     message:
//                         "Password must be at least 8 characters long with one uppercase letter, one lowercase letter, one digit, and one special character !",
//                 });
//             }
//             const hashpass = await bcrypt.hash(password,10);
//             await new UserData({
//                 username,
//                 email,
//                 password:hashpass
//             }).save().then((result)=>{
//                 return res.status(200).json({code:200,message:"User create Successfully",result})
//             }).catch((error)=>{
//                 return res.status(404).json({code:404,message:error.message})
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({code:500,message:error.message})
//     }
// }
// //------------------------For Login User-------------------------------
// exports.Login = async(req,res)=>{
//     try {
//         const {input,password} = req.body
//         if(!input || !password){
//             return res.status(404).json({code:404,message:"Please fill the All the fields"});
//         }
//         const Useremail = await UserData.findOne({email:input}).lean().exec();
//         const Username = await UserData.findOne({username:input}).lean().exec();

//         if(!Useremail && !Username){
//             return res.status(404).json({code:404,message:"User is Not Found Please Register First"});
//         }
//         if(Useremail){
//             const validuser = await bcrypt.compare(password,Useremail.password)
//             if(!validuser){
//                 return res.status(404).json({code:404,message:"Wrong Password"})
//             }
//             const token = genratetoken(Useremail.username);
//             await UserData.findOneAndUpdate(
//                 {email:input},
//                 {$set:{token:token}},
//                 {new:true})
//             .then((result)=>{
//                 return res.status(200).json({code:200,message:"User Login Susccessfully",result})
//             }).catch((error)=>{
//                 return res.status(404).json({code:404,message:error.message})
//             })
//         }else if(Username){
//             const validuser = await bcrypt.compare(password,Username.password)
//             if(!validuser){
//                 return res.status(404).json({code:404,message:"Wrong Password"})
//             }
//             const token = genratetoken(Username.username);
//             await UserData.findOneAndUpdate(
//                 {username:input},
//                 {$set:{token:token}},
//                 {new:true})
//             .then((data)=>{
//                 return res.status(200).json({code:200,message:"UserName Login Susccessfully",data})
//             }).catch((error)=>{
//                 return res.status(404).json({code:404,message:error.message})
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({code:500,message:error.message});
//     }
// }
// //------------------------For Login User With Google-------------------------------
// exports.googleLogin = async (req,res)=>{
//     try {
//         const {email,username} =  req.body
//         const Useremail = await UserData.findOne({email:email}).lean().exec();
//         const Username = await UserData.findOne({username:username}).lean().exec();
//         if(!Useremail && !Username){
//             const token = genratetoken(username);
//             await new UserData({
//                 email, username,token
//             }).save().then((result)=>{
//                 return res.status(200).json({code:200,message:"User Create Successfully",result})
//             }).catch((error)=>{
//                 return res.status(404).json({code:404,message:error.message})
//             })
//         }
//         if(Useremail){
//             const token = genratetoken(Useremail.username);
//             await UserData.findOneAndUpdate(
//                 {email:email},
//                 {$set:{token:token}},
//                 {new:true})
//             .then((result)=>{
//                 return res.status(200).json({code:200,message:"User Login Susccessfully",result})
//             }).catch((error)=>{
//                 return res.status(404).json({code:404,message:error.message})
//             })
//         }
//     } catch (error) {
//         return res.status(500).json({code:500,message:error.message})
//     }
// }
//------------------------For Get Data-------------------------------
