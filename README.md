# node-task-app
1. install mongo DB and use the command to start it:
   .\OneDrive\Documents\work\servers\mongodb-server\bin\mongod.exe --dbpath=OneDrive/Documents/work/servers/mongodb-data
2. install the mongo db admin tool robo3T
3. use mongoose client to ease up the db connections, create models and use data sanitization and validation

4. Promises:

return new Promise((resolve, reject) => {
   if(somethingSuccesfulHappened) {
      const successObject = {
         msg: 'Success',
         data,//...some data we got back
      }
      resolve(successObject); 
   } else {
      const errorObject = {
         msg: 'An error occured',
         error, //...some error we got back
      }
      reject(errorObject);
   }
});

4.1 Promise chaining
 
// before:
    add(1,2)
      .then((sum) => {
         console.log(sum);
         add(sum, 5)
            .then((sum2) => {
               console.log(sum2);
            })
            .catch((e) => {console.log(e)})
      })
      .catch((e) => {console.log(e)})


      
// after
 add(1,2)
   .then((sum) => {
      console.log(sum);
      return add(sum, 4);
      })
   .then( (sum2) => {console.log(sum2)})
   .catch((e) => {console.log(e)})


5. Async/await

Notes: Async functions allways retusn a Promise
const doWork = async () => {
   return 'random string'
}

// console.log(doWork()); // => Promise {'random string'}

doWork().then( (result) => {
   console.log(result); // => 'random string'
}).catch((e) => { console.log (e) })


Await

const add = (a, b) => {
   return new Promise ((resolve, reject) => {
      setTimeout( () => {
         resolve (a + b)
      }, 2000)
   })
}

const doWork = async () => {
  const sum = await add(1, 99)
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, 3);
}


doWork().then((result) => {
   console.log(result); // => 153
}).catch((e) => { console.log (e) })