const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const sellSchema=new Schema({
    title: {
        type: String
    },
    price: {
        type : Number
    },
    category: {
        type: String
    },
    location: {
        type: String
    },
    description : {
        type: String
    },
    image:String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

});

const Sell=mongoose.model("Sell",sellSchema);

module.exports=Sell;

