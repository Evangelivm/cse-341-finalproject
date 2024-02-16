const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);
const mongodb = require('../data/database');
//const nock = require('nock');

beforeAll((done) => {

    mongodb.initDb((err) => {
        if (err) {
            console.error('Error initializing database:', err);
            done.fail(err);
        } else {
            console.log('Database initialized successfully');
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

    it('Get a book', async () => {
        const response = await request.get('/books/65b28d2c849261c514bbcde1').set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Get all authors', async () => {
        const response = await request.get('/authors').set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Get an author', async () => {
        const response = await request.get('/authors/65b28d3a849261c514bbcde8').set('Accept', 'application/json');
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
    it('Avoid create an author without auth', async () => {
        const newAuthor = {
            name: 'required|string',
            nationality: 'required|string',
            birth_date: 'required|string',
            genres: 'required|array',
            notable_works: 'required|array',
        };
        const response = await request.post('/authors').set('Accept', 'application/json').send(newAuthor);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid create a book without auth', async () => {
        const newBook = {
            title: 'required|string',
            author: 'required|string',
            genre: 'required|string',
            year: 'required|integer',
            isbn: "required|string",
            copies: "required|integer",
            publisher: "required|string",
        };
        const response = await request.post('/books').set('Accept', 'application/json').send(newBook);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid create a loan without auth', async () => {
        const newLoan = {
            user: 'required|string',
            book: 'required|string',
            loan_date: 'required|string',
            due_date: 'required|string',
            status: "required|string",
        };
        const response = await request.post('/loans').set('Accept', 'application/json').send(newLoan);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid create a user without auth', async () => {
        const newUser = {
            name: 'required|string',
            email: 'required|email',
            address: 'required|string',
            phone: "required|string",
            borrowed_books: "required|array",
            loan_history: "required|array",
        };
        const response = await request.post('/users').set('Accept', 'application/json').send(newUser);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});




