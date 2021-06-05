const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task(req.body);
    try {
        task.owner = req.user;
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e);
    }
  })

router.get('/tasks',auth, async (req, res) => {
    try {
        // V1
        //const tasks = await Task.find({owner: req.user.id});
        //res.send(tasks);
        //V2
        await req.user.populate('tasks').execPopulate();
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/all', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user.id})
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})


router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdated= ['description', 'completed']
    const isValidOperation = updates.every((update)=> allowedUpdated.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user.id})
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach( (update) => task[update] = req.body[update])
        await task.save()

        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
  
    try {
        // const task = await Task.findByIdAndRemove(req.params.id);
        const task = await Task.findOne({_id: req.params.id, owner: req.user.id})
        await task.delete();

        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router