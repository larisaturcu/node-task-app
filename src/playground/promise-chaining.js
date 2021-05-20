require('../db/mongoose')
const User = require('../models/user')



// User.findById("60995352e5c54a02304c0d0d", ((userUpdated) => {
//     console.log(userUpdated)
// }));

User.findByIdAndUpdate("609a7f22f7857c2ef495dff2", { "email": "tst@gmail.com" }).then((user) => {
    console.log(user);
    return User.countDocuments({"age": 0})
}).then((result) => {
    console.log(result);
}
)
