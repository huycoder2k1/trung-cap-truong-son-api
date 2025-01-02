import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  exam_id: {
    type: String,
    required: true,
    unique: true, 
    minlength: 3,
    maxlength: 50
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class', 
    required: true
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Subject', 
    required: true
  },
  date: {
    type: Date, 
    required: true
  },
  students: [
    {
      student_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true
      },
      status: {
        type: String,
        enum: ['attended', 'absent'], 
        required: true
      }
    }
  ]
}, { timestamps: true, collection: 'exams' }); 

const Exam = mongoose.model('Exam', examSchema);

export const examModel = { Exam };
