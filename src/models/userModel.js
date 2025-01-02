import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,  
    minlength: 3,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6  
  },
  role: {
    type: String,
    enum: ['admin', 'user',],  
    default: 'user',
  },
  last_login: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true, collection: 'users'  })

const User = mongoose.model('User', userSchema)

export const userModel = { User }
