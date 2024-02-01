const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary= Get all the authors
    const result = await mongodb.getDatabase().db('library').collection('authors').find();
    result.toArray().then((authors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(authors);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary= Get a author by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to find a author.');
      }
    const authorsId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('library').collection('authors').find({_id:authorsId});
    result.toArray().then((authors) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(authors[0]);
    });
};

const createAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary= Create a new author
    const authors = {
        name : req.body.name,
        nationality : req.body.nationality,
        birth_date : req.body.birth_date,
        genres : req.body.genres,
        notable_works : req.body.notable_works
        };
    const response = await mongodb.getDatabase().db('library').collection('authors').insertOne(authors);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the author.')
    }
};

const updateAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary= Modify a author by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to update a author.');
      }
    const authorsId = new ObjectId(req.params.id);
    const authors = {
        name : req.body.name,
        nationality : req.body.nationality,
        birth_date : req.body.birth_date,
        genres : req.body.genres,
        notable_works : req.body.notable_works
        };
    const response = await mongodb.getDatabase().db('library').collection('authors').replaceOne({_id:authorsId}, authors);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the author.')
    }
};

const deleteAuthor = async (req, res) => {
    //#swagger.tags=['Authors']
    //#swagger.summary= Delete a author by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid author id to delete a author.');
      }
    const authorsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('library').collection('authors').deleteOne({_id:authorsId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the author.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createAuthor,
    updateAuthor,
    deleteAuthor
}