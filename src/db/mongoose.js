const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
        
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        min: 6,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password must not contain the word password');
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const me = new User({
    name: 'Larisa', email: 'TURCU@gmail.com', password: 'Pass1232'
});


// me.save().then((result) =>{
//     console.log(result);
// }).catch((error) => {
//     console.log(error);
// })

const myTask = new Task({
    description: 'Update model with required',
});

myTask.save().then((result) =>{
    console.log(result);
}).catch((error) => {
    console.log(error);
})