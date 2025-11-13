const { default: mongoose } = require("mongoose")

require("dotenv").config()
async function connectTOMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log({message:"connected Successfully"})
    } catch (error) {
        console.log(error,"error from mongoDB")
    }
}


module.exports = connectTOMongoDB