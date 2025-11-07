 const jwt = require("jsonwebtoken");

module.exports.isOwner=async(req,res,next)=>{
          let{id}=req.params;
          let sellItem=await Sell.findById(id);
          if( !sellItem.owner.equals(req.user._id)){
             req.flash("error"," You are not the owner of this listing");

             return res.redirect(`/listings/${listing._id}`);
          }
          next();
}