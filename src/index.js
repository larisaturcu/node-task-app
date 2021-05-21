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

// const myFunc = async () => {
//  const password = 'Red12345!'
//  const salt = bcrypt.genSaltSync(10);
//  const hashedPassword = await bcrypt.hash(password, salt)

// const isMatch = await bcrypt.compare('Red12345!', hashedPassword);
// console.log(isMatch)

//  return hashedPassword;
// }

// myFunc()