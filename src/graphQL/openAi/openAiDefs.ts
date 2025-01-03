import { gql } from "apollo-server-express";

// GraphQL type definitions and resolvers
const openAiDefs = gql`
	input InitOpenAiInput {
		getRagAgent: Boolean!
		createNewThread: Boolean!
	}

	type InitOpenAiOutput {
		ragAgentId: String
		threadId: String
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
	ragAgentId: string | null;
	threadId: string | null;
}

export default openAiDefs;
