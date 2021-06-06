const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

Task = mongoose.model('Task', tasksSchema);

module.exports = Task