
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(criteria) {
    const filterBy = _makeFilterBy(criteria.filterBy)
    var sortBy = _makeSortBy(criteria.sortBy)
    const collection = await dbService.getCollection('toy')
  
    try {
        const toys = await collection.find(filterBy).sort(sortBy).toArray();
        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
        return toy
    } catch (err) {
        console.log(`ERROR: cannot find toy ${toyId}`)
        throw err;
    }
}

async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        return await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}

async function update(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        toy._id = ObjectId(toy._id);
        toy.updatedAt = Date.now()
        await collection.replaceOne({ "_id": toy._id }, { $set: toy })
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        toy.createdAt = Date.now()
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}

function _makeFilterBy(oldFilter) {
    const reg = new RegExp(oldFilter.txt, 'i')
    const searchFilter = {
        name: reg
    }
    if (oldFilter.type && oldFilter.type !== 'All') {
        searchFilter.type = { $eq: oldFilter.type }
    }
    if (oldFilter.inStock) searchFilter.inStock = { $eq: oldFilter.inStock }

    return searchFilter
}

function _makeSortBy(oldSort) {
    const sortBy = {}

    if (!oldSort) {
        sortBy._id = -1
        return sortBy
    } else if (oldSort === 'name') {
        sortBy.name = 1
    } else sortBy.price = 1

    return sortBy
}
