const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard, getBoards, deleteBoard, updateBoard, addBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.post('/', addBoard)
router.get('/:id', getBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoard)

// router.get('/', getBoards)
// router.post('/',  requireAdmin, addBoard)
// router.get('/:id', getBoard)
// router.put('/:id',  requireAuth, updateBoard)
// router.delete('/:id',  requireAuth, requireAdmin, deleteBoard)

module.exports = router