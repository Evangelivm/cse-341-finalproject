const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongodb = require('../data/database');
const {isAuthenticated} = require("../middleware/authenticate")


let authenticatedSession;

beforeAll(async (done) => {
    // Inicializar la base de datos
    mongodb.initDb(async (err) => {
        if (err) {
            console.error('Error initializing database:', err);
            done.fail(err);
        } else {
            console.log('Database initialized successfully');

            // Crear una sesión autenticada con Passport
            authenticatedSession = session(app);
            await authenticatedSession.get('/login').expect(302);  // Realiza una solicitud de autenticación
            console.log('User authenticated successfully');

            done();
        }
    });
});

describe('GET endpoints', () => {

    it('Get all books', async () => {
        const response = await request.get('/books').set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Get all authors', async () => {
        const response = await request.get('/authors').set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid get all loans without auth', async () => {
        const response = await request.get('/loans').set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid get all users without auth', async () => {
        const response = await request.get('/users').set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});

describe('POST endpoints', () => {

    it('Create a new book', async () => {
        const newBook = {
            title: 'required|string',
            author: 'required|string',
            genre: 'required|string',
            year: 'required|integer',
            isbn: "required|string",
            copies: "required|integer",
            publisher: "required|string"
        };
        const response = await request
            .post('/books')
            .set('Accept', 'application/json')
            .send(newBook);
        expect(response.status).toEqual(201);  
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Post all authors', async () => {
        const response = await request.post('/authors').set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid post all loans without auth', async () => {
        const response = await request.post('/loans').set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid post all users without auth', async () => {
        const response = await request.post('/users').set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});

// Codigo CHATGPT3...5

// // routes.js //
// const express = require('express');
// const passport = require('passport');

// const router = express.Router();

// router.get('/profile', passport.authenticate('github', { session: false }), (req, res) => {
//     // Esta es una ruta protegida que requiere autenticación de GitHub
//     res.json(req.user);
// });

// module.exports = router;

// // routes.test.js//
// const request = require('supertest');
// const app = require('./app');

// describe('GET /login', () => {
//     it('should return 401 Unauthorized without authentication', async () => {
//         const response = await request(app).get('/login');
//         expect(response.status).toBe(401);
//     });

//     it('should return 200 OK with authentication', async () => {
//         // Aquí necesitas obtener un token de acceso de GitHub y pasarlo en la cabecera de autorización
//         const response = await request(app)
//             .get('/login')
//             .set('Authorization', 'Bearer YOUR_GITHUB_ACCESS_TOKEN');

//         expect(response.status).toBe(200);
//         expect(response.body).toHaveProperty('username');
//         // Asegúrate de ajustar esta aserción según lo que esperas recibir del perfil de usuario
//     });
// });