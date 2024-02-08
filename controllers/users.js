const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    //#swagger.summary= Get all the users
    const result = await mongodb.getDatabase().db('library').collection('users').find();
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    //#swagger.summary= Get a user by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to find a user.');
      }
    const userId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('library').collection('users').find({_id:userId});
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
    });
};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    //#swagger.summary= Create a new user
    const user = {
        name : req.body.name,
        email : req.body.email,
        address : req.body.address,
        borrowed_books : req.body.borrowed_books,
        loan_history : req.body.loan_history
        };
    const response = await mongodb.getDatabase().db('library').collection('users').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while creating the user.')
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    //#swagger.summary= Modify a user by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to update a user.');
      }
    const userId = new ObjectId(req.params.id);
    const user = {
        name : req.body.name,
        email : req.body.email,
        address : req.body.address,
        borrowed_books : req.body.borrowed_books,
        loan_history : req.body.loan_history
        };
    const response = await mongodb.getDatabase().db('library').collection('users').replaceOne({_id:userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user.')
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    //#swagger.summary= Delete a user by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid user id to delete a user.');
      }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('library').collection('users').deleteOne({_id:userId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}