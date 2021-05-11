const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
    },
    age: {
        type: Number,
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
    }
});

const me = new User({
    name: 'Larisa', age: '32'
});


const myTask = new Task({
    description: 'Update model', completed: false, user: me
});

myTask.save().then((result) =>{
    console.log(result);
}).catch((error) => {
    console.log(error);
})