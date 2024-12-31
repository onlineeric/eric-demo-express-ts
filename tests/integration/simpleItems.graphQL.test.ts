import request from 'supertest';
import app from '../../src/app';

describe('GraphQL Endpoint', () => {
	const testAuth = {
		username: process.env.TEST_AUTH_USER || '',
		password: process.env.TEST_AUTH_PASSWORD || '',
	};

	it('should fetch all items', async () => {
		const query = `
			query {
				getSimpleItems {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const res = await request(app)
			.post('/graphQL')
			.send({ query })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(res.body.data.getSimpleItems).toBeInstanceOf(Array);
		expect(res.body.data.getSimpleItems[0]).toHaveProperty('id', '1');
		expect(res.body.data.getSimpleItems[0]).toHaveProperty('name');
		expect(res.body.data.getSimpleItems[0]).toHaveProperty('contact');
		expect(res.body.data.getSimpleItems[0].contact).toHaveProperty('email');
		expect(res.body.data.getSimpleItems[0].contact).toHaveProperty('address');
	});

	it('should fetch an item by id', async () => {
		const query = `
			query GetSimpleItem($id: ID!) {
				getSimpleItem(id: $id) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const variables = { id: '1' };

		const res = await request(app)
			.post('/graphQL')
			.send({ query, variables })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(res.body.data.getSimpleItem).toHaveProperty('id', '1');
		expect(res.body.data.getSimpleItem).toHaveProperty('name');
		expect(res.body.data.getSimpleItem).toHaveProperty('contact');
		expect(res.body.data.getSimpleItem.contact).toHaveProperty('email');
		expect(res.body.data.getSimpleItem.contact).toHaveProperty('address');
	});

	it('should create a new item', async () => {
		const mutation = `
			mutation CreateSimpleItem($item: CreateItemInput!) {
				createSimpleItem(item: $item) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const variables = {
			item: {
				name: 'New Item',
				contact: {
					email: 'new@example.com',
					address: '123 New St',
				},
			},
		};

		const res = await request(app)
			.post('/graphQL')
			.send({ query: mutation, variables })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(res.body.data.createSimpleItem).toHaveProperty('id');
		expect(res.body.data.createSimpleItem).toHaveProperty('name', variables.item.name);

		// get the item from server again to verify if the item was created
		const query = `
			query GetSimpleItem($id: ID!) {
				getSimpleItem(id: $id) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const getVars = { id: res.body.data.createSimpleItem.id };

		const getRes = await request(app)
			.post('/graphQL')
			.send({ query, variables: getVars })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(getRes.body.data.getSimpleItem).toHaveProperty('id', res.body.data.createSimpleItem.id);
		expect(getRes.body.data.getSimpleItem).toHaveProperty('name', variables.item.name);
		expect(getRes.body.data.getSimpleItem).toHaveProperty('contact');
		expect(getRes.body.data.getSimpleItem.contact).toHaveProperty('email', variables.item.contact.email);
		expect(getRes.body.data.getSimpleItem.contact).toHaveProperty('address', variables.item.contact.address);
	});

	it('should update an item', async () => {
		const mutation = `
			mutation UpdateSimpleItem($item: UpdateItemInput!) {
				updateSimpleItem(item: $item) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const variables = {
			item: {
				id: '2',
				name: 'Updated Item',
				contact: {
					email: 'updated@example.com',
					address: '456 Updated St',
				},
			},
		};

		const res = await request(app)
			.post('/graphQL')
			.send({ query: mutation, variables })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(res.body.data.updateSimpleItem).toHaveProperty('name', 'Updated Item');

		// get the item from server again to verify if the item was updated
		const query = `
			query GetSimpleItem($id: ID!) {
				getSimpleItem(id: $id) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const getVars = { id: variables.item.id };

		const getRes = await request(app)
			.post('/graphQL')
			.send({ query, variables: getVars })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(getRes.body.data.getSimpleItem).toHaveProperty('id', variables.item.id);
		expect(getRes.body.data.getSimpleItem).toHaveProperty('name', variables.item.name);
		expect(getRes.body.data.getSimpleItem).toHaveProperty('contact');
		expect(getRes.body.data.getSimpleItem.contact).toHaveProperty('email', variables.item.contact.email);
		expect(getRes.body.data.getSimpleItem.contact).toHaveProperty('address', variables.item.contact.address);

	});

	it('should delete an item', async () => {
		const mutation = `
			mutation DeleteSimpleItem($id: ID!) {
				deleteSimpleItem(id: $id)
			}
		`;

		const variables = { id: '3' };

		const res = await request(app)
			.post('/graphQL')
			.send({ query: mutation, variables })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(res.body.data.deleteSimpleItem).toBe(`Item with id ${variables.id} deleted`);

		// get the item from server to verify if the item was deleted
		const query = `
			query GetSimpleItem($id: ID!) {
				getSimpleItem(id: $id) {
					id
					name
					contact {
						email
						address
					}
				}
			}
		`;

		const getVars = { id: variables.id };

		const getRes = await request(app)
			.post('/graphQL')
			.send({ query, variables: getVars })
			.auth(testAuth.username, testAuth.password)
			.expect(200);

		expect(getRes.body.data.getSimpleItem).toBeNull();
	});

	it('should return 401 Unauthorized without credentials', async () => {
		const query = `
			query {
				getSimpleItems {
					id
				}
			}
		`;

		await request(app)
			.post('/graphQL')
			.send({ query })
			.expect(401);
	});
});