import { Document, model, Schema } from "mongoose";

export interface IWorkout extends Document {
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  durationMinutes: number;
  tags: string[];
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  difficulty: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  durationMinutes: { type: Number, required: true },
  tags: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() },
});

export const WorkoutModel = model<IWorkout>("Workout", workoutSchema);
