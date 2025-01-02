import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  schedule_id: {
    type: String,
    required: true,
    unique: true, 
    minlength: 3,
    maxlength: 50,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class', 
    required: true,
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher', 
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject', 
    required: true,
  },
  day_of_week: {
    type: String,
    enum: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'], 
    required: true,
  },
  start_time: {
    type: String,
    required: true, 
  },
  end_time: {
    type: String,
    required: true, 
  },
}, { timestamps: true, collection: 'schedules' }); 

const Schedule = mongoose.model('Schedule', scheduleSchema);

export const scheduleModel = { Schedule };
