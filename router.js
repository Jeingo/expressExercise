const Router = require('express')

const db = require('.\\db')

const PostController = require('.\\PostController')

const router = new Router()

router.post('/posts', PostController.create)
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

module.exports = router
