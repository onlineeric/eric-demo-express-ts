import { gql } from "apollo-server-express";

// GraphQL type definitions and resolvers
const openAiDefs = gql`
	type Query {
		initOpenAi(input: InitOpenAiInput): InitOpenAiOutput
	}

	input InitOpenAiInput {
		getRagAgent: bool!
		createNewThread: bool!
	}

	type InitOpenAiOutput {
		ragAgentId: String
		threadId: String
	}
`;

// typescript interfaces
export interface InitOpenAiInput {
	getRagAgent: boolean;
	createNewThread: boolean;
}

export interface InitOpenAiOutput {
	ragAgentId: string | null;
	threadId: string | null;
}

export default openAiDefs;
