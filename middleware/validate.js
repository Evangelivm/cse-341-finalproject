const validator = require('../helpers/validate');

const saveAuthor = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    nationality: 'required|string',
    birth_date: 'required|string',
    genres: 'required|array',
    notable_works: 'required|array'
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

const saveBook = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      author: 'required|string',
      genre: 'required|string',
      year: 'required|integer',
      isbn: "required|string",
      copies: "required|integer",
      publisher: "required|string"
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

  const saveLoan = (req, res, next) => {
    const validationRule = {
      user: 'required|string',
      book: 'required|string',
      loan_date: 'required|string',
      due_date: 'required|string',
      status: "required|string"
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


  const saveUser = (req, res, next) => {
    const validationRule = {
      name: 'required|string',
      email: 'required|email',
      address: 'required|string',
      phone: "required|string",
      borrowed_books: "required|array",
      loan_history: "required|array"
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
    saveAuthor,
    saveBook,
    saveLoan,
    saveUser
};