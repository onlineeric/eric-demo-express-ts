import { InitOpenAiInput, InitOpenAiOutput } from "./openAiDefs";
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

export const initOpenAi = async (
	_: any,
	{ input }: { input: InitOpenAiInput }
): Promise<InitOpenAiOutput> => {

	const ragAgent = (input.getRagAgent ? await getRagAgent() : null) as string | null;
	const thread = (input.createNewThread ? await createThread() : null) as string | null;

	return {
		ragAgent: ragAgent,
		thread: thread
	} as InitOpenAiOutput;
};

const getRagAgent = async () => {
	if (!process.env.OPENAI_RAG_AGENT_ID) {
		throw new Error("RAG Agent ID not found in environment variables");
	}
	const agent = await openai.beta.assistants.retrieve(process.env.OPENAI_RAG_AGENT_ID);
	return JSON.stringify(agent);
};

const createThread = async () => {
	const thread = await openai.beta.threads.create();
	return JSON.stringify(thread);
};
