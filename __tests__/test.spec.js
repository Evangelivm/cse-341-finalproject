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

describe('PUT endpoints', () => {
    it('Avoid update an author without auth', async () => {
        const authorToUpdate = {
            _id: "65b28d3a849261c514bbcde8",
            name: "Harper Lee",
            nationality: "American",
            birth_date: "1926-04-28",
            genres: [
                "Fiction"
            ],
            notable_works: [
                "To Kill a Mockingbird"
            ]
        };
        const response = await request.put(`/authors/${authorToUpdate._id}`).set('Accept', 'application/json').send(authorToUpdate);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid update a book without auth', async () => {
        const bookToUpdate = {
            _id: "65b28d2c849261c514bbcde1",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            genre: "Fiction",
            year: 1960,
            isbn: "0-06-112008-1",
            copies: 2,
            publisher: "J.B. Lippincott & Co."
        };
        const response = await request.put(`/books/${bookToUpdate._id}`).set('Accept', 'application/json').send(bookToUpdate);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid update a loan without auth', async () => {
        const loanToUpdate = {
            _id: "65b28e1b849261c514bbcdf5",
            user: "Bob Smith",
            book: "1984",
            loan_date: "2024-03-01",
            due_date: "2024-03-15",
            status: "Overdue"
            };
        const response = await request.put(`/loans/${loanToUpdate._id}`).set('Accept', 'application/json').send(loanToUpdate);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid update a user without auth', async () => {
        const userToUpdate = {
            _id: "65b28e14849261c514bbcdee",
            name: "Alice Johnson",
            email: "alice@example.com",
            address: "123 Main St, Cityville, USA",
            phone: "+1 555-1234",
            borrowed_books: [
                "The Great Gatsby"
            ],
            loan_history: [
            {
                book: "The Great Gatsby",
                loan_date: "2024-01-01",
                due_date: "2024-01-15",
                status: "Returned"
            }
            ]
            };
        const response = await request.put(`/users/${userToUpdate._id}`).set('Accept', 'application/json').send(userToUpdate);
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});

describe('DELETE endpoints', () => {
    
    it('Avoid delete a book without auth', async () => {
        const bookIdToDelete = "65b28d2c849261c514bbcde1";
        const response = await request.delete(`/books/${bookIdToDelete}`).set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid delete an author without auth', async () => {
        const authorIdToDelete = "65b28d3a849261c514bbcde8";
        const response = await request.delete(`/authors/${authorIdToDelete}`).set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid delete a loan without auth', async () => {
        const loanIdToDelete = "65b28e1b849261c514bbcdf5";
        const response = await request.delete(`/loans/${loanIdToDelete}`).set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });

    it('Avoid delete a user without auth', async () => {
        const userIdToDelete = "65b28e14849261c514bbcdee";
        const response = await request.delete(`/users/${userIdToDelete}`).set('Accept', 'application/json');
        expect(response.status).toEqual(401);
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    });
});
