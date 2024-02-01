const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.summary= Get all the tasks
    const result = await mongodb.getDatabase().db('system-project').collection('tasks').find();
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.summary= Get a task by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid task id to find a task.');
      }
    const tasksId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('system-project').collection('tasks').find({_id:tasksId});
    result.toArray().then((tasks) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(tasks[0]);
    });
};

const createTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.summary= Create a new task
    const tasks = {
        name : req.body.name,
        description : req.body.description,
        due_date : req.body.due_date,
        status : req.body.status,
        assignee : req.body.assignee,
        project : req.body.project
        };
    const response = await mongodb.getDatabase().db('system-project').collection('tasks').insertOne(tasks);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the task.')
    }
};

const updateTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.summary= Modify a task by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid task id to update a task.');
      }
    const tasksId = new ObjectId(req.params.id);
    const tasks = {
        name : req.body.name,
        description : req.body.description,
        due_date : req.body.due_date,
        status : req.body.status,
        assignee : req.body.assignee,
        project : req.body.project
        };
    const response = await mongodb.getDatabase().db('system-project').collection('tasks').replaceOne({_id:tasksId}, tasks);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the task.')
    }
};

const deleteTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    //#swagger.summary= Delete a task by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid task id to delete a task.');
      }
    const tasksId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('system-project').collection('tasks').deleteOne({_id:tasksId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the task.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createTask,
    updateTask,
    deleteTask
}