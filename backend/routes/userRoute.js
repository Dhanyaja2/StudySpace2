import express from "express";
import { addUser, loginUser } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post('/addUser', addUser);
userRoute.post('/loginUser', loginUser);

export default userRoute;