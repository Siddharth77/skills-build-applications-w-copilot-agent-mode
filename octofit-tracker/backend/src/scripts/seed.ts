import dotenv from "dotenv";
import { connectDatabase } from "../config/database";
import { ActivityModel } from "../models/activity.model";
import { TeamModel } from "../models/team.model";
import { UserModel } from "../models/user.model";
import { WorkoutModel } from "../models/workout.model";

dotenv.config();

async function seed() {
  await connectDatabase();

  await Promise.all([
    UserModel.deleteMany({}),
    TeamModel.deleteMany({}),
    ActivityModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    { name: "Ali Carter", email: "ali@example.com", role: "user" },
    { name: "Mia Chen", email: "mia@example.com", role: "coach" },
    { name: "Noah Singh", email: "noah@example.com", role: "user" },
  ]);

  const teams = await TeamModel.create([
    { name: "Team Octo", description: "Performance-focused group", members: [users[0]._id, users[2]._id] },
  ]);

  await WorkoutModel.create([
    { name: "Morning Strength", description: "Full body beginner strength workout.", difficulty: "beginner", durationMinutes: 35, tags: ["strength", "beginner"] },
    { name: "Endurance Run", description: "Cardio session for endurance training.", difficulty: "intermediate", durationMinutes: 45, tags: ["cardio", "endurance"] },
  ]);

  await ActivityModel.create([
    { user: users[0]._id, type: "Running", durationMinutes: 40, caloriesBurned: 320, date: new Date() },
    { user: users[2]._id, type: "Yoga", durationMinutes: 30, caloriesBurned: 150, date: new Date() },
    { user: users[0]._id, type: "Cycling", durationMinutes: 50, caloriesBurned: 450, date: new Date() },
  ]);

  console.log("Seed data created for OctoFit Tracker.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
