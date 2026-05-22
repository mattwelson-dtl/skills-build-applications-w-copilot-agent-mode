import express from 'express';
import mongoose from 'mongoose';
import Activity from './models/activity.model';
import Leaderboard from './models/leaderboard.model';
import Team from './models/team.model';
import User from './models/user.model';
import Workout from './models/workout.model';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  try {
    const items = await User.find().sort({ createdAt: -1 });
    res.json({ resource: 'users', items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: String(error) });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const items = await Team.find().sort({ createdAt: -1 });
    res.json({ resource: 'teams', items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams', details: String(error) });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const items = await Activity.find().sort({ performedAt: -1 });
    res.json({ resource: 'activities', items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities', details: String(error) });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const items = await Leaderboard.find().sort({ rank: 1 });
    res.json({ resource: 'leaderboard', items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard', details: String(error) });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const items = await Workout.find().sort({ createdAt: -1 });
    res.json({ resource: 'workouts', items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts', details: String(error) });
  }
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`OctoFit Tracker backend listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

void startServer();
