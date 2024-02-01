const validator = require('../helpers/validate');

const saveProj = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    description: 'required|string',
    start_date: 'required|string',
    end_date: 'required|string',
    status: 'required|string',
    team : "required|array",
    tasks : "required|array",
    client : "required|string"
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTask = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      description: 'required|string',
      due_date: 'required|string',
      status: 'required|string',
      assignee : "required|string",
      project : "required|string"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveTeamMem = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      role: 'required|string',
      email: 'required|email',
      phone: 'required|string',
      skills : "required|array",
      projects : "required|array"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };


  const saveTeamMem = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      role: 'required|string',
      email: 'required|email',
      phone: 'required|string',
      skills : "required|array",
      projects : "required|array"
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };


module.exports = {
    saveProj,
    saveTask,
    saveTeamMem
};