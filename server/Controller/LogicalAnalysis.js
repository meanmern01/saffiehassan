const LogicalAnalysis = require('../Model/LogicalAnalysis');
const Analysis = require('../Model/Analysis');
const Response = require('../Model/Response');
const Userdata = require('../Model/User');
const axios = require('axios');

exports.LogicalAnlysis = async (req, res) => {
    try {
        const { Demographics, CosmeticConcerns, SkinType} = req.body;
             
        //------------Get Maximum Race Prediction-------------
        let Race = Demographics.Race
        const maxRace = Race.map(x => x.Prediction);
        var Racedata = Race.filter(x => x.Prediction == Math.max(...maxRace));
        
        //------------Get Maximum Age Prediction-------------
        let Age = Demographics.Age
        const maxAge = Age.map(x => x.Prediction);
        var Agedata = Age.filter(x => x.Prediction == Math.max(...maxAge));

        //------------Get Maximum Sex Prediction-------------
        let Sexdata = Demographics.Sex;

        //------------Get Maximum CosmeticConcerns Prediction-------------
        const Cosmetic = CosmeticConcerns.map(x => x.Prediction);
        var Cosmeticdata = CosmeticConcerns.filter(x => x.Prediction == Math.max(...Cosmetic));

        //------------Get Maximum Skindata Prediction-------------
        const Skin = SkinType.map(x => x.Prediction);
        var Skindata = SkinType.filter(x => x.Prediction == Math.max(...Skin));
        let Object = {
            Race: {
                Variant: Racedata[0].Variant,
                Prediction: Racedata[0].Prediction
            },
            Age: {
                Criteria: Agedata[0].Criteria,
                Prediction: Agedata[0].Prediction
            },
            Sex: {
                Type: Sexdata.Type
            }
        }
        let user = await Userdata.findOne({ userId: req.user.userId })
        let userdata = await LogicalAnalysis.findOne({ User: req.user.userId })
        if (!userdata) {
            await new LogicalAnalysis({
                User: req.user.userId,
                Demographics: Object,
                CosmeticConcerns: Cosmeticdata[0],
                SkinType: Skindata[0]
            }).save().then((result) => {
                return res.status(200).json({ code: 200, message: "LogicalAnalysis Store Successfully", result });
            }).catch((error) => {
                return res.status(404).json({ code: 404, message: error.message })
            })
        } else {
            await LogicalAnalysis.findOneAndUpdate(
                { User: req.user.userId },
                { $set: { Demographics: Object, CosmeticConcerns: Cosmeticdata[0], SkinType: Skindata[0] } }, { new: true }).
                then((result) => {
                    return res.status(200).json({ code: 200, message: "LogicalAnalysis Update Successfully", result })
                }).catch((error) => {
                    return res.status(404).json({ code: 404, message: error.message });
                })
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: 500, message: error.message })
    }
}

exports.LogicalResponse = async (req,res)=>{
    try {
        const resData = []
        const ST1 = ["OSPW","OSNW","OSPT","OSNT","ORPW","ORNW","ORPT","ORNT"]
        const ST2 = ["OSPW","ORPW","OSNW","ORNW","DSPW","DRPW","DSNW","DRNW"]
        const ST3 = ["OSPW","DSPW","OSPT","DSPT","ORPW","DRNW","ORPT","DRNT"]
        const data = await Analysis.findOne({User: req.user.userId})
        let skindata = data.SkinType.find(data => data.Name == "BaumanSkinType")
        let skindata2 = data.SkinType.find(data => data.Name == "FitzpatrickSkinType")        
        const CosmeticData = data.CosmeticConcerns.map(x => x.Prediction);
        var Cosmetics = data.CosmeticConcerns.find(x => x.Prediction == Math.max(...CosmeticData));            
        let Null = data.CosmeticConcerns.find(data => data.Name == "None");
        let Age = data. Demographics.Age;  
        let Criteria = []
        Age.filter((i)=>{
           if(i.Prediction > 0){
                Criteria.push(i.Criteria);
           }
        })
        if(ST1.includes(skindata.SkinType)){
            let obj = {
                Name:"Clogged Pores",
                SkinType:skindata.SkinType
            }
            resData.push(obj)
        }
        if(ST1.includes(skindata.SkinType)){
            let obj = {
                Name:"Oily Skin",
                SkinType:skindata
            }
            resData.push(obj)  
        }
        if(ST2.includes(skindata.SkinType) && (Cosmetics.Name==("Crow's Feet Wrinkles")||Cosmetics.Name==("Forehead Rhytid")||Cosmetics.Name==("Glabellar Rhytid"))){
            let obj = {
                Name:"Wrinkling",
                SkinType:skindata,
                CosmeticConcerns:Cosmetics
            }
            resData.push(obj) 
        }
        if(Cosmetics.Name == ("Undereye Dark Circles")){
            let obj = {
                Name:"Dark Circles",
                CosmeticConcerns:Cosmetics
            }
        }
        if(ST2.includes(skindata.SkinType) && (Cosmetics.Name==("Crow's Feet Wrinkles")||Cosmetics.Name==("Forehead Rhytid")||Cosmetics.Name==("Glabellar Rhytid")) && (skindata2.SkinType == 'I'||skindata2.SkinType == 'II')){
            let obj = {
                Name:"Sun Damage",
                Bauman_SkinType:skindata,
                CosmeticConcerns:Cosmetics,
                Fitzpatrick_SkinType:skindata2
            }
        }
        if(Null.Prediction > 0){
            let obj = {
                Name:"Textural Irregularities",
                value:Null.Prediction
            }
        }
        if(ST3.includes(skindata.SkinType)){
            let obj = {
                Name:"Uneven Skin Tone",
                SkinType:skindata
            }
        }
        if(((Criteria.includes('40-49')||Criteria.includes('50-59')||Criteria.includes('60-69')||Criteria.includes('70+')))&&(Cosmetics.Name==("Crow's Feet Wrinkles")||Cosmetics.Name==("Forehead Rhytid")||Cosmetics.Name==("Glabellar Rhytid"))||Cosmetics.Name == ("Nasolabial lines")){
            let obj = {
                Name:"Signs Of Aging",
                Age:((Criteria.includes('40-49')||Criteria.includes('50-59')||Criteria.includes('60-69')||Criteria.includes('70+'))),
                CosmeticConcerns:Cosmetics
            }
        }
        if(Null.Prediction > 0){
            let obj = {
                Name:"Dullness",
                value:Null.Prediction
            }
        }
        const user = await Response.findOne({User: req.user.userId  })
        if(user){            
                await Response.findOneAndUpdate(
                 {User:req.user.userId},
                 {$set:{Data:resData}},{new:true}).
                 then((result)=>{              
                     return res.status(200).json({code:200,message:"Response Update Successfully",result})
                 }).catch((error)=>{
                     return res.status(404).json({code:404,message:error.message});
                 })            
        }else{
            await new Response({
                User : req.user.userId,
                Data:resData
            }).save().then((result)=>{
                return res.status(200).json({code:200,message:"Response Store Successfully",result});
            }).catch((error)=>{
                return res.status(404).json({code:404,message:error.message})
            })
        }
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message })
    }
}