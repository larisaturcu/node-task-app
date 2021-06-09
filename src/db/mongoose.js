const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true
});