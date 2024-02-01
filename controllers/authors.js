const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary= Get all the projects
    const result = await mongodb.getDatabase().db('system-project').collection('projects').find();
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projects);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary= Get a project by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to find a project.');
      }
    const projectsId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('system-project').collection('projects').find({_id:projectsId});
    result.toArray().then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projects[0]);
    });
};

const createProj = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary= Create a new project
    const projects = {
        name : req.body.name,
        description : req.body.description,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        status : req.body.status,
        team : req.body.team,
        tasks : req.body.tasks,
        client : req.body.client
        };
    const response = await mongodb.getDatabase().db('system-project').collection('projects').insertOne(projects);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the project.')
    }
};

const updateProj = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary= Modify a project by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to update a project.');
      }
    const projectsId = new ObjectId(req.params.id);
    const projects = {
        name : req.body.name,
        description : req.body.description,
        start_date : req.body.start_date,
        end_date : req.body.end_date,
        status : req.body.status,
        team : req.body.team,
        tasks : req.body.tasks,
        client : req.body.client
        };
    const response = await mongodb.getDatabase().db('system-project').collection('projects').replaceOne({_id:projectsId}, projects);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the project.')
    }
};

const deleteProj = async (req, res) => {
    //#swagger.tags=['Projects']
    //#swagger.summary= Delete a project by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid project id to delete a project.');
      }
    const projectsId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('system-project').collection('projects').deleteOne({_id:projectsId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the project.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createProj,
    updateProj,
    deleteProj
}