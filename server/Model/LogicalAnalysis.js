const mongoose = require('mongoose');
const LogicalSchema = mongoose.Schema({
    User: String,
    Demographics:{
        Race:{
            Variant: String,
            Prediction: String
        },
        Age:{
            Criteria: String,
            Prediction: String
        },
        Sex: {
            Type: String
        }
    },
    CosmeticConcerns: {
        Name: String,
        Prediction: String,
        Description: String
    },
    SkinType: {
        Name: String,
        SkinType: String,
        Description: String,
        Prediction: String
    }

});

module.exports = mongoose.model("LogicalData", LogicalSchema);