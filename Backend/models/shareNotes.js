const mongoose=require("mongoose");
const Schema=mongoose.Schema;



const shareNoteSchema=new Schema({
    title:{
        type: String
    },
    course:{
        type:String
    },
    semester:{
        type: Number
    },
    description:{
        type: String
    },
    image:{
        filename:String,
        url:String,
    },
    
});

const ShareNotes=mongoose.model("ShareNotes",shareNoteSchema);

module.exports=ShareNotes;

