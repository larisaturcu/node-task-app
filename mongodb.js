const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const databaseNameTasks = 'tasks'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('unable to connect to the database')
  }

  const db = client.db(databaseNameTasks);

  db.collection('tasks').insertMany([{
    description: 'first task',
    completed: true
  }, {
    description: 'second task',
    completed: false
  },
  {
    description: 'third task',
    completed: false
  }], (error, result) => {
    if (error) {
      return console.log('could not insert one')
    }
    console.log(result.ops);
    console.log(result.insertedCount);
  });


});