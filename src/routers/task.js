const express = require('express')
const auth = require('../middleware/auth')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e);
    }
})

// GET /tasks?completed={boolean}
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    const sort = {}
    
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    //const limit = req.query.limit ? parseInt(req.query.limit) : 2
    //const skip = req.query.skip ? parseInt(req.query.skip) : 0
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
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
        const task = await Task.findOne({ _id, owner: req.user.id })
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
    const allowedUpdated = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
        if (!task) {
            return res.status(404).send();
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {

    try {
        // const task = await Task.findByIdAndRemove(req.params.id);
        const task = await Task.findOne({ _id: req.params.id, owner: req.user.id })
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