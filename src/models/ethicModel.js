import mongoose from 'mongoose';

const ethicSchema = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    semester: {
        type: String,
        required: true,
        enum: ['Học kì 1', 'Học kì 2'], 
    },
    year: {
        type: String,
        required: true
    },
    ethics_score: {
        type: Number,
        required: true,
        min: 0, 
        max: 10
    }
}, { timestamps: true, collection: 'ethics' });

const Ethic = mongoose.model('Ethic', ethicSchema);

export const ethicModel = { Ethic };
