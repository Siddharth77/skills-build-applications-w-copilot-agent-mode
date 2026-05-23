import { Router } from "express";
import { ActivityModel } from "../models/activity.model";

const router = Router();

router.get("/", async (_req, res) => {
  const leaderboard = await ActivityModel.aggregate([
    {
      $group: {
        _id: "$user",
        totalDuration: { $sum: "$durationMinutes" },
        totalCalories: { $sum: "$caloriesBurned" },
        activityCount: { $sum: 1 },
      },
    },
    { $sort: { totalCalories: -1, totalDuration: -1 } },
    { $limit: 10 },
  ]);

  res.json({ leaderboard });
});

export default router;
