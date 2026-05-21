import express from 'express';
import mongoose from 'mongoose';

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

app.get('/api/users/', (_req, res) => {
  res.json({ resource: 'users', items: [] });
});

app.get('/api/teams/', (_req, res) => {
  res.json({ resource: 'teams', items: [] });
});

app.get('/api/activities/', (_req, res) => {
  res.json({ resource: 'activities', items: [] });
});

app.get('/api/leaderboard/', (_req, res) => {
  res.json({ resource: 'leaderboard', items: [] });
});

app.get('/api/workouts/', (_req, res) => {
  res.json({ resource: 'workouts', items: [] });
});

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(PORT, () => {
    console.log(`OctoFit backend listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

void startServer();
