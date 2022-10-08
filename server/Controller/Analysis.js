const Analysis = require('../Model/Analysis');
const Userdata = require('../Model/User');
const axios = require('axios');
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();
let Whether
exports.anlysis = async(req,res)=>{
    try {
        const {Demographics,CosmeticConcerns,SkinType,city} = req.body; 
        let url = `https://api.weatherbit.io/v2.0/current/airquality?&city=${city}&key=${process.env.URL_KEY}`
        await axios.get(url).then((response)=>{
            Whether =  response.data
        }).catch((error)=>{
            console.log(error.message,'.........err');
        })
        let user = await Userdata.findOne({userId:req.user.userId})        
        let userdata = await Analysis.findOne({User:req.user.userId})
        if(!userdata){
            await new Analysis({
                User : req.user.userId,
                Demographics,
                CosmeticConcerns,
                SkinType,
                Whether
            }).save().then((result)=>{
                return res.status(200).json({code:200,message:"Analysis Store Successfully",result});
            }).catch((error)=>{
                return res.status(404).json({code:404,message:error.message})
            })
        }else{
           await Analysis.findOneAndUpdate(
            {User:req.user.userId},
            {$set:{Demographics,CosmeticConcerns,SkinType,Whether}},{new:true}).
            then((result)=>{              
                return res.status(200).json({code:200,message:"Analysisdata Update Successfully",result})
            }).catch((error)=>{
                return res.status(404).json({code:404,message:error.message});
            })
        }
    } catch (error) {
        return res.status(500).json({code:500,message:500,message:error.message})
    }
}