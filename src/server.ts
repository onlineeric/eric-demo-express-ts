import dotenv from "dotenv";
dotenv.config();
import app from "./app";

export const ENV_VAR_PREFIX: string = "EXPRESS_";
export const getPrefixedEnvVar = (key: string): string | undefined => {
	return process.env[`${ENV_VAR_PREFIX}${key}`];
};

const PORT = getPrefixedEnvVar("PORT") || 5000;

app.listen(PORT, () => {
	if (getPrefixedEnvVar("NODE_ENV") === "development") {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
});
