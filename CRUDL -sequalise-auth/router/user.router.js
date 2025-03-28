const express = require("express");
const userRouter = express.Router();

const { asyncHandler } = require("../globalErrorHandling/globalErrorHandler");
const { addUser, getUsers } = require("../model/users");

userRouter.post("/", asyncHandler(addUser));
// userRouter.get("/", asyncHandler(getUsers));

module.exports = userRouter;
