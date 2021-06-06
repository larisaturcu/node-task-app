const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a picture'))
        }
        cb(undefined, true)
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    console.log(user)
    try {
        await user.save() // this can be removed as the save method is also called inside generate token
        const token = await user.generateToken();
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password); // findByCredentials is a static method available for the class User
        const token = await user.generateToken(); // generate method is called for the user instance
        res.status(200).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token // keep all the tokens different from the login token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/me', async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user);
    } catch (e) {
        res.status(500).send(e)
    }
})

// upload profile pic
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).png().resize({width:250, height:250}).toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send();
   
}, (error, req, res, next) => {
    res.status(400).send({
        'error': error.message
    })
})


router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send();
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/users/:id/avatar',  async (req, res) => {
    try {
        console.log(req.params.id)
       const user = await User.findById(req.params.id)

       if (!user || !user.avatar) {
           throw new Error('no user or no avatar')
       }
       res.set('Content-Type', 'image/png')
       res.send(user.avatar)

    } catch (e) {
        res.status(404).send(e)
    }
})


module.exports = router