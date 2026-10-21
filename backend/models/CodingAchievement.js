import mongoose from 'mongoose';

const codingAchievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Achievement title is required'],
      trim: true
    },
    platform: {
      type: String,
      default: 'General',
      trim: true
    },
    badgeImage: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    credentialUrl: {
      type: String,
      default: '',
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const CodingAchievement = mongoose.model('CodingAchievement', codingAchievementSchema);
export default CodingAchievement;
