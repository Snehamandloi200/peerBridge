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
    contact:{
        type : Number,
    },
    image:String,
    creator:{
        type : String,
    },
      owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});

const LostAndFound=mongoose.model("LostAndFound",lostAndFoundSchema);

module.exports=LostAndFound;



