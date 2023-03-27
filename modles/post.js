const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title:{type:String, require:true},
    body:{type:String, require:true},
    device:{type:String, require:true, enum: ["Laptop", "Tablet", "Mobile"],},
    no_of_comments:{type:Number, require:true},
    userId:{type:String, require:true},

});

const Post = mongoose.model("post", PostSchema);
module.exports ={Post};