const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const bcrypt = require('bcryptjs')
app.listen(port, () => {
    console.log('server is up');
})

const Task = require('./models/task')
const User = require('./models/user')

// const myFunc = async () => {
//     // const task = await Task.findById('60bb29d257ca1e585c05306f')
//     const user = await User.findById('60bb24ff3df36c5180be9c6e')
//     // task.owner = user
//     // task.save();
//    await user.populate('tasks').execPopulate()
//     // user.populate('tasks')
//     console.log(user.tasks)
// }
// myFunc()