const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next)=> {
//     res.status(503).send('Site is in maintenance')
// })
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


const bcrypt = require('bcryptjs')
app.listen(port, () => {
    console.log('server is up');
})

// const jwt = require('jsonwebtoken')
// const myFunc = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'thisismynewcourse', {expiresIn: '0 seconds'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log("data ")
//     console.log(data)
// }


// myFunc()