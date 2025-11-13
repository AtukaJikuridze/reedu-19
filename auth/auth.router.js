const { Router } = require("express");
const usersModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res
      .status(400)
      .json({ message: "fullName,email  and password required" });
  }
  const exsistingUser = await usersModel.findOne({ email: email });
  if (exsistingUser) {
    return res.status(400).json({ message: "user already exsists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await usersModel.create({ fullName, email, password: hashedPassword });

  res.json({ message: "user created successfully" });
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email  and password required" });
  }

  const exsistingUser = await usersModel.findOne({ email: email });
  if (!exsistingUser) {
    return res.status(400).json({ message: "invalid credentials" });
  }
  const isEqualPassword =  await bcrypt.compare(password,exsistingUser.password)
 if (!isEqualPassword) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  const paylaod = {
    userId:exsistingUser._id
  }
  
  console.log(paylaod)

  const token = jwt.sign(paylaod,process.env.JWT_SECRET,{expiresIn:"1h"})
  res.json({message:"token generated successfully",data:token})
});

module.exports = authRouter;
