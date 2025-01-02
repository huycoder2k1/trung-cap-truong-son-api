import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true,
    unique: true,  
    minlength: 8, 
    maxlength: 8,  
  },
  name: {
    type: String,
    required: true,  
  },
  dob: {
    type: Date,
    required: true,  
  },
  address: {
    type: String,
    required: true,  
  },
  phone: {
    type: String,
    required: true,  
    minlength: 10,   
    maxlength: 15,   
  },
  email: {
    type: String,
    required: true,  
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',  
    required: true,  
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],  
    required: true,
  },
}, { timestamps: true, collection: 'students' });  

const Student = mongoose.model('Student', studentSchema);

export const studentModel = { Student };
