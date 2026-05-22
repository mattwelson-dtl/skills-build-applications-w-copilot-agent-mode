import mongoose, { InferSchemaType, Model } from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    performedAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity: Model<ActivityDocument> =
  mongoose.models.Activity || mongoose.model<ActivityDocument>('Activity', activitySchema);

export default Activity;
