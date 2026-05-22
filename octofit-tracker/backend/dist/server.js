"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const activity_model_1 = __importDefault(require("./models/activity.model"));
const leaderboard_model_1 = __importDefault(require("./models/leaderboard.model"));
const team_model_1 = __importDefault(require("./models/team.model"));
const user_model_1 = __importDefault(require("./models/user.model"));
const workout_model_1 = __importDefault(require("./models/workout.model"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
        const items = await user_model_1.default.find().sort({ createdAt: -1 });
        res.json({ resource: 'users', items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users', details: String(error) });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const items = await team_model_1.default.find().sort({ createdAt: -1 });
        res.json({ resource: 'teams', items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams', details: String(error) });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const items = await activity_model_1.default.find().sort({ performedAt: -1 });
        res.json({ resource: 'activities', items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities', details: String(error) });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const items = await leaderboard_model_1.default.find().sort({ rank: 1 });
        res.json({ resource: 'leaderboard', items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard', details: String(error) });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const items = await workout_model_1.default.find().sort({ createdAt: -1 });
        res.json({ resource: 'workouts', items });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts', details: String(error) });
    }
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(PORT, () => {
        console.log(`OctoFit backend listening on port ${PORT}`);
        console.log(`API base URL: ${apiBaseUrl}`);
    });
}
void startServer();
