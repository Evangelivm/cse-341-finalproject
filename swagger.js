const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Library Management System Api',
        description: 'Library Api'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);