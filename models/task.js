const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a task name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    category: {
      type: String,
      enum: ["TODO", "TASK", "HABIT"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model('Task', taskSchema);