import mongoose, { InferSchemaType, Model } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team: Model<TeamDocument> = mongoose.models.Team || mongoose.model<TeamDocument>('Team', teamSchema);

export default Team;
