const { default: mongoose } = require("mongoose");

const postsSchema = new mongoose.Schema({
    title:{
        type:String
    },

    desc:{
        type:String
    },

    user:{type:mongoose.Types.ObjectId,ref:"user"}
})


module.exports = mongoose.model("post",postsSchema)