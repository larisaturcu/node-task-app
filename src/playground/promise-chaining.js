require('../db/mongoose')
const User = require('../models/user')



// User.findById("60995352e5c54a02304c0d0d", ((userUpdated) => {
//     console.log(userUpdated)
// }));

// User.findByIdAndUpdate("609a7f22f7857c2ef495dff2", { "email": "tst@gmail.com" }).then((user) => {
//     console.log(user);
//     return User.countDocuments({"age": 0})
// }).then((result) => {
//     console.log(result);
// }
// )



const updateAgeAndCount = async (userId, age) => {
    await User.findByIdAndUpdate(userId, { age });
    const total =  await User.countDocuments({age})
    return total;
}

updateAgeAndCount('60a3de2d160dab4b841164e8', 22).then( (result) => {
    console.log(result);
}).catch ((e) => {
    console.log(e);
})