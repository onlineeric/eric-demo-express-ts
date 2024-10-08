import expressBasicAuth from "express-basic-auth";

const basicAuth = expressBasicAuth({
	users: {
		'eric': 'cheng',
		'korina': 'cheng',
		'tonia': 'cheng',
	}
});

export default basicAuth;