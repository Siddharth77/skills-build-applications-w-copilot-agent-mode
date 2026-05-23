import { Router } from "express";
import { ActivityModel } from "../models/activity.model";

const router = Router();

router.get("/", async (_req, res) => {
  const activities = await ActivityModel.find().populate("user");
  res.json(activities);
});

router.post("/", async (req, res) => {
  const { user, type, durationMinutes, caloriesBurned, date } = req.body;
  const activity = new ActivityModel({ user, type, durationMinutes, caloriesBurned, date });
  await activity.save();
  res.status(201).json(activity);
});

export default router;
