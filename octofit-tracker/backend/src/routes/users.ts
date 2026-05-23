import { Router } from "express";
import { UserModel } from "../models/user.model";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { name, email, role } = req.body;
  const user = new UserModel({ name, email, role });
  await user.save();
  res.status(201).json(user);
});

export default router;
