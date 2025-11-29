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
    email:{
        type :String,
    },
    linkedin:{
        type : String,
    },
    creator:{
        type : String,
    },

     owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
});

const Hackathon=mongoose.model("Hackathon",hackathonSchema);

module.exports=Hackathon;


