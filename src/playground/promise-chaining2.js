require('../db/mongoose')
const Task = require('../models/task')


// Task.countDocuments({"completed": false}).then( (result) => {
//         console.log('total incompmpleted docs ' + result);
//         return Task.findOneAndDelete('609a2f01db8c652918f337ee')
//     }).then((result2) => {
//         console.log(result2);
//         return Task.countDocuments({"completed": false});
//     }).then((total) => {
//         console.log('total incompmpleted docs ' + total);
//     });


const deleteTaskAndCount = async (taskId) => {
   await Task.findOneAndDelete(taskId);


    // const inserted = await Task.insertMany([{
    //     description: 'first task',
    //     completed: true
    //   }, {
    //     description: 'second task',
    //     completed: false
    //   },
    //   {
    //     description: 'third task',
    //     completed: false
    //   }]);
    

    const total = await Task.countDocuments({"completed": false});
    return total;
}


deleteTaskAndCount('60a62b2dd7a4500b80df8129').then((total) => {
    console.log('remaining incompleted tasks: ' + total);
}).catch ( (e) => {console.log(e)})
