import { Router } from "express";
import { TeamModel } from "../models/team.model";

const router = Router();

router.get("/", async (_req, res) => {
  const teams = await TeamModel.find().populate("members");
  res.json(teams);
});

router.post("/", async (req, res) => {
  const { name, description, members } = req.body;
  const team = new TeamModel({ name, description, members });
  await team.save();
  res.status(201).json(team);
});

export default router;
