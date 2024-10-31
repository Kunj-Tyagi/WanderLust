const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    // default value store karne ka liye!
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String, 
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }, 
    category:{
        type:String,
        required:[true,'Category is mandatory'],
        enum:["Trending","Rooms","Iconic Cities","Mountains","Castles","Amazing Pools","Camping","Farms","Arctic","Domes"],
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})

// model or collection
const Listing=mongoose.model("Listing",listingSchema);

// export model on app.js
module.exports=Listing;