const mongoose = require('mongoose');

const Userdata = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    token:{
        type:String,
        require:true
    },
    Recommendation:{
        Age: {
            type: String,
            enum : ['13-17','18-24','25-34','35-44','45-54','55-120']
        },
        SkinType: {
            type: String,
            enum : ['Normal','Combination','Dry','Oily'],
        },
        Climate: {
            type: String,
            enum : ['Continental','Polar','Tropical','Dry','Temperate']
        },
        SkinConcerns: {
            type: String,
            enum : ['Acne','Aging','Blackheads','Dark Circles','Dullness','Stretch Marks','Pores','Redness','Sun Damage','Uneven Skin Tones']
        },
        SkinTyone: {
            type: String,
            enum : ['Dark','Deep','Ebony','Fair','Light','Medium','Olive','Porcelain','Tan']
        },
        Gender: {
            type: String,
            enum : ['Male','Female']
        },
        Race: {
            type: String,
            enum : ['Black','White']
        }       
    }
});

module.exports = mongoose.model("UserData",Userdata);