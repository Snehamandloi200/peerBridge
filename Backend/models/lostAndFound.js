const mongoose=require("mongoose");
const Schema=mongoose.Schema;



const lostAndFoundSchema=new Schema({
    status:{
        type:String
    },
    itemName:{
        type: String
    },
    location:{
        type: String
    },
    description:{
        type: String
    },
    image:String,
});

const LostAndFound=mongoose.model("LostAndFound",lostAndFoundSchema);

module.exports=LostAndFound;



