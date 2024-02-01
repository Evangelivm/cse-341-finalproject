const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.summary= Get all the books
    const result = await mongodb.getDatabase().db('library').collection('books').find();
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.summary= Get a book by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to find a book.');
      }
    const booksId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('library').collection('books').find({_id:booksId});
    result.toArray().then((books) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(books[0]);
    });
};

const createbook = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.summary= Create a new book
    const books = {
        title : req.body.title,
        author : req.body.author,
        genre : req.body.genre,
        year : req.body.year,
        isbn : req.body.isbn,
        copies : req.body.copies,
        publisher : req.body.publisher
        };
    const response = await mongodb.getDatabase().db('library').collection('books').insertOne(books);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the book.')
    }
};

const updatebook = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.summary= Modify a book by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to update a book.');
      }
    const booksId = new ObjectId(req.params.id);
    const books = {
        title : req.body.title,
        author : req.body.author,
        genre : req.body.genre,
        year : req.body.year,
        isbn : req.body.isbn,
        copies : req.body.copies,
        publisher : req.body.publisher
        };
    const response = await mongodb.getDatabase().db('library').collection('books').replaceOne({_id:booksId}, books);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the book.')
    }
};

const deletebook = async (req, res) => {
    //#swagger.tags=['Books']
    //#swagger.summary= Delete a book by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid book id to delete a book.');
      }
    const booksId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('library').collection('books').deleteOne({_id:booksId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the book.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createbook,
    updatebook,
    deletebook
}