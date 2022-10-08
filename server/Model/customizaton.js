const mongoose = require('mongoose');
const CustomSchema = mongoose.Schema({
    Serum:{
        KeyIngrediants:[{detail:"top 10 ingrediants"}],
        Fragrance:[{detail:"Hardcodeed"}],
        Consistancy:[{detail:"Fixed Condiional"}],
        Base:[{drtail:"Fixed Conditional"}],

    }
    
})