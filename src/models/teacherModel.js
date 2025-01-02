import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  teacher_id: {
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
  specialization: {
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
}, { timestamps: true, collection: 'teachers' });  

const Teacher = mongoose.model('Teacher', teacherSchema);

export const teacherModel = { Teacher };
