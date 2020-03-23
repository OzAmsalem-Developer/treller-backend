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
    // const critaria = JSON.parse(req.query.data)
    
    const boards = await boardService.query()
    try {
        res.json(boards)
    }
    catch(err) {
        console.log(err);
    }
    
}

async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    try {
        res.json(board)
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    addBoard,
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard
}