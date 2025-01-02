import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    required: true,
    unique: true,  
    minlength: 5, 
    maxlength: 10,  
  },
  name: {
    type: String,
    required: true,  
  },
  credits: {
    type: Number,
    required: true,  
    min: 1,  
    max: 10,  
  },
}, { timestamps: true, collection: 'subjects' });  

const Subject = mongoose.model('Subject', subjectSchema);

export const subjectModel = { Subject };
