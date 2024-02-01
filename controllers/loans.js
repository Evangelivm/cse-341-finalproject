const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Team Members']
    //#swagger.summary= Get all the team members
    const result = await mongodb.getDatabase().db('library').collection('loans').find();
    result.toArray().then((teamMem) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teamMem);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Team Members']
    //#swagger.summary= Get a team member by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team member id to find a team member.');
      }
    const teamMemId = new ObjectId(req.params.id)
    const result = await mongodb.getDatabase().db('library').collection('loans').find({_id:teamMemId});
    result.toArray().then((TeamMem) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(TeamMem[0]);
    });
};

const createTeamMem = async (req, res) => {
    //#swagger.tags=['Team Members']
    //#swagger.summary= Create a new team member
    const teamMem = {
        name : req.body.name,
        role : req.body.role,
        email : req.body.email,
        phone : req.body.phone,
        skills : req.body.skills,
        projects : req.body.projects
        };
    const response = await mongodb.getDatabase().db('library').collection('loans').insertOne(teamMem);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while creating the team member.')
    }
};

const updateTeamMem = async (req, res) => {
    //#swagger.tags=['Team Members']
    //#swagger.summary= Modify a team member by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team member id to update a team member.');
      }
    const teamMemId = new ObjectId(req.params.id);
    const teamMem = {
        name : req.body.name,
        role : req.body.role,
        email : req.body.email,
        phone : req.body.phone,
        skills : req.body.skills,
        projects : req.body.projects
        };
    const response = await mongodb.getDatabase().db('library').collection('loans').replaceOne({_id:teamMemId}, teamMem);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while updating the team member.')
    }
};

const deleteTeamMem = async (req, res) => {
    //#swagger.tags=['Team Members']
    //#swagger.summary= Delete a team member by id
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid team member id to delete a team member.');
      }
    const teamMemId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('library').collection('loans').deleteOne({_id:teamMemId}, true);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error courred while deleting the team member.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createTeamMem,
    updateTeamMem,
    deleteTeamMem
}