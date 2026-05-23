import { Router } from "express";
import { WorkoutModel } from "../models/workout.model";

const router = Router();

router.get("/", async (_req, res) => {
  const workouts = await WorkoutModel.find();
  res.json(workouts);
});

router.post("/", async (req, res) => {
  const { name, description, difficulty, durationMinutes, tags } = req.body;
  const workout = new WorkoutModel({ name, description, difficulty, durationMinutes, tags });
  await workout.save();
  res.status(201).json(workout);
});

export default router;
