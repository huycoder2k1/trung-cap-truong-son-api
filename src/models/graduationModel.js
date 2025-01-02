import mongoose from 'mongoose';

const graduationSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
    required: true,
    unique: true, 
  },
  status: {
    type: String,
    enum: ['eligible', 'not_eligible'], 
    required: true,
  },
  rank: {
    type: String,
    enum: ['excellent', 'good', 'average', 'poor'],
    required: true,
  },
  certificates: [
    {
      type: {
        type: String,
        required: true,
      },
      issued_date: {
        type: Date,
        required: true,
      },
    },
  ], 
}, { timestamps: true, collection: 'graduations' });

const Graduation = mongoose.model('Graduation', graduationSchema);

export const graduationModel = { Graduation };
