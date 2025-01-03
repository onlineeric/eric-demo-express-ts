import { InitOpenAiInput, InitOpenAiOutput } from "./openAiDefs";

export const initOpenAi = async (
	_: any,
	{ input }: { input: InitOpenAiInput }
): Promise<InitOpenAiOutput> => {

	console.log("initOpenAi input: ", input);

	return {
		ragAgentId: null,
		threadId: null
	} as InitOpenAiOutput;
};
