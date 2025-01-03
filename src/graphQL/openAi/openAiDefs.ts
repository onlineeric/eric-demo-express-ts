import { gql } from "apollo-server-express";
import OpenAI from "openai";

// GraphQL type definitions and resolvers
const openAiDefs = gql`
	input InitOpenAiInput {
		getRagAgent: Boolean!
		createNewThread: Boolean!
	}

	type InitOpenAiOutput {
		ragAgent: String
		thread: String
	}

	type Mutation {
		initOpenAi(input: InitOpenAiInput): InitOpenAiOutput
	}
`;

// typescript interfaces
export interface InitOpenAiInput {
	getRagAgent: boolean;
	createNewThread: boolean;
}

export interface InitOpenAiOutput {
	ragAgent: OpenAI.Beta.Assistants.Assistant | null;
	thread: OpenAI.Beta.Threads.Thread | null;
}

export default openAiDefs;
