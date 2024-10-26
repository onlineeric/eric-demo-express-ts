import request from 'supertest';
import app from '../../src/app';
import { version as appVersion } from '../../package.json';

// root endpoint, return status and version
describe('GET /', () => {
  it('should return server status and version', async () => {
	const response = await request(app).get('/');

	expect(response.status).toBe(200);
	expect(response.text).toBe(`Hello, TypeScript with Express! Version: ${appVersion}`);
  });
});
