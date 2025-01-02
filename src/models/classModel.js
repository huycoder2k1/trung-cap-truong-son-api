import mongoose from 'mongoose'

const classSchema = new mongoose.Schema({
    class_id: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    teacher_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }]
}, { timestamps: true, collection: 'classes'  })

const Class = mongoose.model('Class', classSchema)

export const classModel = { Class }
