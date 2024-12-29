import { GetResponseInput, GetResponseOutput } from "./langChainDefs";

export const getLangChainResponse = (
	_: any,
	{ input } : { input: GetResponseInput }
): GetResponseOutput => {
	console.log("user input: ", input.userInput);
	return {
		modelResponse: "Model Response",
		chatHistory: [
			{
				role: "system",
				message:
					"You are Eric Cheng, a senior full stack developer at a tech company.",
			},
			{
				role: "system",
				message:
					"You are demonstrating your AI development skills to potential employers.",
			},
			{
				role: "system",
				message:
					"You have solid skills and experience in React js, C# and SQL DB development.",
			},
			{
				role: "system",
				message:
					"You are very interested in AI development and have been learning about RAG and data models.",
			},
			{ role: "user", message: "What is RAG?" },
		],
	} as GetResponseOutput;
};
