const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },

    posts:{type:[mongoose.Schema.Types.ObjectId],ref:"posts",default:[]}

},
{
    timestamps:true
}
)

module.exports = mongoose.model("user",userSchema)