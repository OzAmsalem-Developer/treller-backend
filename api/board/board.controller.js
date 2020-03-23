const boardService = require('./board.service')

async function addBoard(req, res) {
    // console.log('EEREE' , req.body);
    
     const board = await boardService.add(req.body)
     res.send(board)
}

async function getBoard(req, res) {
    const board = await boardService.getById(req.params.id)
    res.send(board)
}
  
async function getBoards(req, res) {
    const critaria = JSON.parse(req.query.data)
    const boards = await boardsService.query(critaria)
    res.send(boards)
}

async function deleteBoard(req, res) {
    await boardsService.remove(req.params.id)
    res.end()
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardsService.update(board)
    res.send(board)
}

module.exports = {
    addBoard,
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard
}