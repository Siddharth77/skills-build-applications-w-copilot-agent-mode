import express from "express";
import activitiesRouter from "./activities";
import leaderboardRouter from "./leaderboard";
import teamsRouter from "./teams";
import usersRouter from "./users";
import workoutsRouter from "./workouts";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/teams", teamsRouter);
router.use("/activities", activitiesRouter);
router.use("/workouts", workoutsRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;
