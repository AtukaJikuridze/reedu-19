const { Router } = require("express");
const usersModel = require("../models/users.model");
const { isValidObjectId } = require("mongoose");


const userRouter = Router()


userRouter.get("/",async(req,res) => {
    const findAllUser = await usersModel.find().select("-password")
    res.json({message:"user finded successfully", data:findAllUser})
})


userRouter.get("/:id",async (req,res) => {
    const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"invalid id",data:null})
    }

    const findById = await usersModel.findById(id).select("-password")
    res.json({message:"user finded by id  successfully", data:findById})
})

userRouter.delete("/:id",async (req,res) => {
      const {id} = req.params
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"invalid id",data:null})
    }
    const deleteUser = await usersModel.findByIdAndDelete(id)
    res.json({message:"user deleted successfully", data:deleteUser})
})



userRouter.put("/:id",async(req,res) => {
      const {id} = req.params
      const {fullName,email} = req.body
    if(!isValidObjectId(id)){
        return res.status(400).json({message:"invalid id",data:null})
    }
    const updateUser =await usersModel.findByIdAndUpdate(id,{fullName,email},{new:true})
     res.json({message:"user updated successfully", data:updateUser})
})

module.exports = userRouter