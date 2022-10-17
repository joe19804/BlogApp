import request from 'supertest';
import app from './app.js';

describe('POST /api/auth/login', () => {
    describe('when passed a username and password', () => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).post('/api/auth/login').send({
                username: 'test',
                password: 'secret1234'
            })
            expect(response.statusCode).toBe(200);
        })
    })

})