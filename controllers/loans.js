const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Loans']
    //#swagger.summary= Get all the loans
    const result = await mongodb.getDatabase().db('library').collection('loans').find();
    result.toArray().then((loan) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(loan);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Loans']
    //#swagger.summary= Get a loan by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid loan id to find a loan.');
      }
    const loanId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('library').collection('loans').find({_id:loanId});
    result.toArray().then((loan) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(loan[0]);
    });
};

const createLoan = async (req, res) => {
    //#swagger.tags=['Loans']
    //#swagger.summary= Create a new loan
    const loan = {
        user : req.body.user,
        book : req.body.book,
        loan_date : req.body.loan_date,
        due_date : req.body.due_date,
        status : req.body.status
        };
    const response = await mongodb.getDatabase().db('library').collection('loans').insertOne(loan);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the loan.')
    }
};

const updateLoan = async (req, res) => {
    //#swagger.tags=['Loans']
    //#swagger.summary= Modify a loan by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid loan id to update a loan.');
      }
    const loanId = new ObjectId(req.params.id);
    const loan = {
        user : req.body.user,
        book : req.body.book,
        loan_date : req.body.loan_date,
        due_date : req.body.due_date,
        status : req.body.status
        };
    const response = await mongodb.getDatabase().db('library').collection('loans').replaceOne({_id:loanId}, loan);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the loan.')
    }
};

const deleteLoan = async (req, res) => {
    //#swagger.tags=['Loans']
    //#swagger.summary= Delete a loan by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid loan id to delete a loan.');
      }
    const loanId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('library').collection('loans').deleteOne({_id:loanId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the loan.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createLoan,
    updateLoan,
    deleteLoan
}