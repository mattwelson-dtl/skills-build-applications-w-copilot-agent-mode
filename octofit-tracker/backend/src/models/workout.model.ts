import mongoose, { InferSchemaType, Model } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 5 },
    estimatedCalories: { type: Number, required: true, min: 10 }
  },
  { timestamps: true }
);

type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout: Model<WorkoutDocument> =
  mongoose.models.Workout || mongoose.model<WorkoutDocument>('Workout', workoutSchema);

export default Workout;
