import expressBasicAuth from "express-basic-auth";

const basicAuth = expressBasicAuth({
	users: {
		'eric': 'cheng',
		'korina': 'cheng',
		'tonia': 'cheng',
	},
	unauthorizedResponse: () => ({ message: 'Unauthorized' }),
	challenge: false,
});

export default basicAuth;