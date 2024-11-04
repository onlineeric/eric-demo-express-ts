import request from 'supertest';
import app from '../../src/app';

describe('benchmarkRouter Endpoints', () => {
	const testAuth = {
		username: process.env.TEST_AUTH_USER || '',
		password: process.env.TEST_AUTH_PASSWORD || '',
	};

	describe('GET /benchmark/Sha256/:execTimes', () => {
		const execTimes = 100;
		it('should return 401 Unauthorized without credentials', async () => {
			const res = await request(app)
				.get(`/benchmark/Sha256/${execTimes}/`)
				.expect(401);

			expect(res.body).toHaveProperty('message', 'Unauthorized');
		});

		it('should return executed benchmark result', async () => {
			const res = await request(app)
				.get(`/benchmark/Sha256/${execTimes}`)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				server: 'Express Server',
				id: expect.any(String),
				algorithm: 'sha256',
				parallelization: false,
				cpuTime: expect.any(Number),
				memoryUsed: expect.any(Number),
				executionTime: expect.any(Number),
				finishedTime: expect.any(String),
			});
		});
	});

	describe('GET /benchmark/Md5/:execTimes', () => {
		const execTimes = 100;
		it('should return 401 Unauthorized without credentials', async () => {
			const res = await request(app)
				.get(`/benchmark/Md5/${execTimes}/`)
				.expect(401);

			expect(res.body).toHaveProperty('message', 'Unauthorized');
		});

		it('should return executed benchmark result', async () => {
			const res = await request(app)
				.get(`/benchmark/Md5/${execTimes}`)
				.auth(testAuth.username, testAuth.password)
				.expect(200);

			expect(res.body).toEqual({
				server: 'Express Server',
				id: expect.any(String),
				algorithm: 'md5',
				parallelization: false,
				cpuTime: expect.any(Number),
				memoryUsed: expect.any(Number),
				executionTime: expect.any(Number),
				finishedTime: expect.any(String),
			});
		});
	});
});
