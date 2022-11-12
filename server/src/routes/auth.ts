import express from "express";
import User from "../models/User";
import { UserType } from "../types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = (await User.findOne({ email: req.body.email })) as UserType;
    !user && res.status(401).json("Wrong password or username");

    if (await bcrypt.compare(req.body.password, user.password)) {
      //create json web token
      const accesToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.ENCRYPTON_SECRET as string,
        { expiresIn: "5d" }
      );

      const { password, ...info } = user!._doc;
      res.status(200).json({ ...info, accesToken });
    } else {
      res.status(401).json("Wrong password or username");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
