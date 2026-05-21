"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
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
