import { GetResponseInput, GetResponseOutput } from "./langChainDefs";
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

const chain = new StringOutputParser();

export const getLangChainResponse = async (
	_: any,
	{ input }: { input: GetResponseInput }
): Promise<GetResponseOutput> => {
	// convert chat history format from [{role: string, message: string}] to [[string, string]]
	const chatHistory: [string, string][] = input.chatHistory.map((chat) => [
		chat.role,
		chat.message,
	]);
	chatHistory.push(["user", input.userInput]);

	const prompt = ChatPromptTemplate.fromMessages(chatHistory);

	const chatModelOpenAI = new ChatOpenAI({
		apiKey: process.env.REACT_APP_OPENAI_API_KEY,
		model: input.dataModel,
		temperature: input.temperature,
	});

	// Link the updated prompt with the ChatOpenAI model
	const chatRes = await prompt.pipe(chatModelOpenAI).pipe(chain).invoke({
		input: input.userInput,
	});

	// Append the bot's response to the chat history
	chatHistory.push(["ai", chatRes]);

	// convert chat history format back to [{role: string, message: string}]
	const chatHistoryOutput = chatHistory.map(([role, message]) => ({role, message}));

	return {
		modelResponse: chatRes,
		chatHistory: chatHistoryOutput,
	} as GetResponseOutput;
};
