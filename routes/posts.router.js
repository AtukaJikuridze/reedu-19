const { Router } = require("express");
const postsModel = require("../models/posts.model");

const postsRouter = Router()




postsRouter.get("/",async (req,res) => {
    const posts = await postsModel.find()
    res.json({message:"find all posts successfully",data:posts})
})



module.exports = postsRouter
