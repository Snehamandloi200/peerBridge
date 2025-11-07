const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const hackathonSchema=new Schema({
    name:{
        type: String
    },
    neededmembers:{
        type: Number
    },
    skills:{
        type : String
    },
    project:{
      type:String,
    },
    date:{
        type:String,
    },
    description: {
        type: String
    },
    
});

const Hackathon=mongoose.model("Hackathon",hackathonSchema);

module.exports=Hackathon;


