import request from 'supertest';
import app from '../../src/app';

describe('simpleRouter Endpoints', () => {
	const testAuth = {
		username: process.env.TEST_AUTH_USER || '',
		password: process.env.TEST_AUTH_PASSWORD || '',
	};

	describe('GET /simple/', () => {
		it('should return a simple get response', async () => {
			const res = await request(app)
				.get('/simple/')
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({ message: 'Simple get response' });
		});

		it('should return 401 Unauthorized without credentials', async () => {
			const res = await request(app)
				.get('/simple/')
				.expect(401);

			expect(res.body).toHaveProperty('message', 'Unauthorized');
		});
	});

	describe('GET /simple/:id', () => {
		it('should return a simple get response with id', async () => {
			const id = '123';
			const res = await request(app)
				.get(`/simple/${id}`)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({ message: `Simple get response with id: ${id}` });
		});
	});

	describe('GET /simple/query/:id', () => {
		it('should return a simple get response with id and query strings', async () => {
			const id = '4466';
			const query = { name: 'John', age: '30' };
			const res = await request(app)
				.get(`/simple/query/${id}`)
				.query(query)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				message: `Simple get response for id: ${id} with query strings name and age`,
				name: 'John',
				age: '30',
			});
		});
	});

	describe('POST /simple', () => {
		it('should return a simple post response with body', async () => {
			const body = { data: 'Test data' };
			const res = await request(app)
				.post('/simple')
				.send(body)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				message: 'Simple post response',
				body,
			});
		});
	});

	describe('PUT /simple/:id', () => {
		it('should return a simple put response with id and body', async () => {
			const id = '456';
			const body = { update: 'Updated data' };
			const res = await request(app)
				.put(`/simple/${id}`)
				.send(body)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				message: `Simple put response with id: ${id}`,
				body,
			});
		});
	});

	describe('DELETE /simple/:id', () => {
		it('should return a simple delete response with id', async () => {
			const id = '789';
			const res = await request(app)
				.delete(`/simple/${id}`)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				message: `Simple delete response with id: ${id}`,
			});
		});
	});
});
