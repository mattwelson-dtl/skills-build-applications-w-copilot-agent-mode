import mongoose from 'mongoose';
import Activity from '../models/activity.model';
import Leaderboard from '../models/leaderboard.model';
import Team from '../models/team.model';
import User from '../models/user.model';
import Workout from '../models/workout.model';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI);

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const workouts = await Workout.insertMany([
    { title: 'Sunrise Cardio Blast', category: 'Cardio', difficulty: 'Beginner', durationMinutes: 30, estimatedCalories: 260 },
    { title: 'Power Lift Circuit', category: 'Strength', difficulty: 'Advanced', durationMinutes: 45, estimatedCalories: 420 },
    { title: 'Core Stability Flow', category: 'Mobility', difficulty: 'Intermediate', durationMinutes: 35, estimatedCalories: 240 },
    { title: 'Hill Sprint Session', category: 'HIIT', difficulty: 'Advanced', durationMinutes: 25, estimatedCalories: 310 }
  ]);

  const users = await User.insertMany([
    { fullName: 'Ariana Cole', email: 'ariana.cole@example.com', age: 28, fitnessGoal: 'Run a half-marathon' },
    { fullName: 'Noah Bennett', email: 'noah.bennett@example.com', age: 34, fitnessGoal: 'Build lean muscle' },
    { fullName: 'Priya Nair', email: 'priya.nair@example.com', age: 31, fitnessGoal: 'Improve mobility and posture' }
  ]);

  const teams = await Team.insertMany([
    { name: 'Octo Sprinters', city: 'Seattle', memberIds: [users[0]._id, users[1]._id] },
    { name: 'Core Climbers', city: 'Austin', memberIds: [users[2]._id] }
  ]);

  await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
  await User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id });
  await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id });

  await Activity.insertMany([
    {
      userId: users[0]._id,
      workoutId: workouts[0]._id,
      performedAt: new Date('2026-05-18T07:00:00.000Z'),
      durationMinutes: 32,
      distanceKm: 5.2,
      caloriesBurned: 285,
      notes: 'Strong pace through final kilometer.'
    },
    {
      userId: users[1]._id,
      workoutId: workouts[1]._id,
      performedAt: new Date('2026-05-19T18:30:00.000Z'),
      durationMinutes: 48,
      caloriesBurned: 455,
      notes: 'Improved deadlift form and volume.'
    },
    {
      userId: users[2]._id,
      workoutId: workouts[2]._id,
      performedAt: new Date('2026-05-20T12:00:00.000Z'),
      durationMinutes: 36,
      caloriesBurned: 252,
      notes: 'Mobility session reduced back stiffness.'
    },
    {
      userId: users[0]._id,
      workoutId: workouts[3]._id,
      performedAt: new Date('2026-05-21T06:45:00.000Z'),
      durationMinutes: 24,
      distanceKm: 3.1,
      caloriesBurned: 318,
      notes: 'Sprint intervals felt controlled.'
    }
  ]);

  await Leaderboard.insertMany([
    { userId: users[0]._id, points: 1240, weeklyStreak: 5, totalActivities: 19, rank: 1 },
    { userId: users[1]._id, points: 1125, weeklyStreak: 4, totalActivities: 16, rank: 2 },
    { userId: users[2]._id, points: 980, weeklyStreak: 6, totalActivities: 14, rank: 3 }
  ]);

  console.log('Seed completed successfully for octofit_db.');
}

seedDatabase()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
