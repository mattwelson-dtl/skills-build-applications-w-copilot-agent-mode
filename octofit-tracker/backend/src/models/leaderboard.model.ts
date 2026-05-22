import mongoose, { InferSchemaType, Model } from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, min: 0 },
    weeklyStreak: { type: Number, required: true, min: 0 },
    totalActivities: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 }
  },
  { timestamps: true }
);

type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

const Leaderboard: Model<LeaderboardDocument> =
  mongoose.models.Leaderboard || mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema);

export default Leaderboard;
