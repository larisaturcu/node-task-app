const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../models/task')

const userSchema = new mongoose.Schema({
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
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password must not contain the word password');
            }
        }
    },
    tokens: [{
        token :{
        type: String,
        required: true,
       }
    }]
})

// setup relationship between user and its tasks
userSchema.virtual('tasks', {
    ref: 'Task',
    localField:'_id',
    foreignField: 'owner'
})

// static methods available for the class User
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user;

}

// methods created for the user instance
userSchema.methods.generateToken = async  function () {
    // this is declared as a standard function because we need to access the .this of the user instance
    const user = this
    const token = jwt.sign({_id : user._id.toString()}, 'thisismynewcourse', {expiresIn: '1 day'})
    user.tokens = user.tokens.concat({token}) // add the generated token to the list of tokens of the user
    
    await user.save()

    return token

}


userSchema.methods.toJSON =  function () {
    // this is declared as a standard function because we need to access the .this of the user instance
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}
// hash the plain text pass before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

// hash the plain text pass before saving
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

User = mongoose.model('User', userSchema);

module.exports = User