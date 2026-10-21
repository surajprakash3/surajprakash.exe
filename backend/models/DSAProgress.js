import mongoose from 'mongoose';

const dsaProgressSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, 'Topic name is required'],
      trim: true
    },
    category: {
      type: String,
      default: 'Data Structures',
      trim: true
    },
    order: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      default: 30
    },
    solvedQuestions: {
      type: Number,
      default: 0
    },
    easy: {
      type: Number,
      default: 0
    },
    medium: {
      type: Number,
      default: 0
    },
    hard: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Mastered', 'In Progress', 'To Revise', 'Not Started'],
      default: 'In Progress'
    },
    notes: {
      type: String,
      default: ''
    },
    confidence: {
      type: Number, // 1 to 5 stars or percentage
      default: 80
    }
  },
  { timestamps: true }
);

const DSAProgress = mongoose.model('DSAProgress', dsaProgressSchema);
export default DSAProgress;
