"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    workoutId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Workout', required: true },
    performedAt: { type: Date, required: true },
    durationMinutes: { type: Number, required: true, min: 5 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 10 },
    notes: { type: String, trim: true }
}, { timestamps: true });
const Activity = mongoose_1.default.models.Activity || mongoose_1.default.model('Activity', activitySchema);
exports.default = Activity;
