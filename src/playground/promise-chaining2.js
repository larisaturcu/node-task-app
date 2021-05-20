require('../db/mongoose')
const Task = require('../models/task')


Task.countDocuments({"completed": false}).then( (result) => {
        console.log('total incompmpleted docs ' + result);
        return Task.findOneAndDelete('609a2f01db8c652918f337ee')
    }).then((result2) => {
        console.log(result2);
        return Task.countDocuments({"completed": false});
    }).then((total) => {
        console.log('total incompmpleted docs ' + total);
    });