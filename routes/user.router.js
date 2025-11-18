const { Router } = require("express");
const UserModel = require("../models/users.model");
const { isValidObjectId } = require("mongoose");

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const allUsers = await UserModel.find().select("-password").lean();
  res.status(200).json({ status: "success", users: allUsers });
});

userRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID format" });
  }

  const foundUser = await UserModel.findById(userId).select("-password");

  if (!foundUser) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.status(200).json({
    status: "success",
    message: "User retrieved",
    user: foundUser,
  });
});

userRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID format" });
  }

  const deletedUser = await UserModel.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res
      .status(404)
      .json({ status: "error", message: "User not found for deletion" });
  }

  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
    deletedUser: deletedUser,
  });
});

userRouter.put("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, userEmail } = req.body;

  if (!isValidObjectId(userId)) {
    return res
      .status(400)
      .json({ status: "error", message: "Invalid user ID format" });
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    userId,
    {
      fullName: name,
      email: userEmail,
    },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return res
      .status(404)
      .json({ status: "error", message: "User not found for update" });
  }

  res.status(200).json({
    status: "success",
    message: "User updated",
    user: updatedUser,
  });
});

module.exports = userRouter;
