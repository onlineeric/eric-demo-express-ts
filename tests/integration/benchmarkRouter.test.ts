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
				message: {
					Algorithm: 'sha256',
					CpuTime: expect.any(Number),
					MemoryUsed: expect.any(Number),
					ExecutionTime: expect.any(Number),
					FinishedTime: expect.any(String),
				},
			});
		});
	});
});
