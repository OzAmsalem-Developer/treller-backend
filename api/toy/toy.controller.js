const toyService = require('./toy.service')

async function addToy(req, res) {
    console.log('EEREE' , req.body);
    
     const toy = await toyService.add(req.body)
     res.send(toy)
}

async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.send(toy)
}
  
async function getToys(req, res) {
    const critaria = JSON.parse(req.query.data)
    const toys = await toyService.query(critaria)
    res.send(toys)
}

async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

async function updateToy(req, res) {
    const toy = req.body;
    await toyService.update(toy)
    res.send(toy)
}

module.exports = {
    addToy,
    getToy,
    getToys,
    deleteToy,
    updateToy
}