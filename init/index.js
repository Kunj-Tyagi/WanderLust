// Intialization ka logic:)
const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

// Database name-Wanderlust:)
const MONGO_URL="mongodb+srv://kunjtyagi045_db_user:RJEJkdaSslnMdFd6@cluster0.g5fh8lg.mongodb.net/Wanderlust1?appName=Cluster0";

// main function ko call karna ka liya
main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

// for connection between node and mongodb!
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,
        owner:"671386c9315ae746e8329ae4",
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
