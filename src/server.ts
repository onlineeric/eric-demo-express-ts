import dotenv from "dotenv";
if (process.env.NODE_ENV === 'development') {
	dotenv.config();
}

import app from "./app";

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
	if (process.env.NODE_ENV === 'development') {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
});
