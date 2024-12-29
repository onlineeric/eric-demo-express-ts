import { gql } from "apollo-server-express";

// GraphQL type definitions and resolvers
const langChainDefs = gql`
	input ChatMessageInput {
		role: String!
		message: String!
	}

	type ChatMessage {
		role: String!
		message: String!
	}

	type Query {
		getLangChainResponse(input: GetResponseInput): GetResponseOutput
	}

	input GetResponseInput {
		chatHistory: [ChatMessageInput!]!
		userInput: String!
		dataModel: String!
		temperature: Float!
	}

	type GetResponseOutput {
		modelResponse: String!
		chatHistory: [ChatMessage!]!
	}
`;

// typescript interfaces
export interface ChatMessage {
	role: string;
	message: string;
}

export interface GetResponseInput {
	chatHistory: ChatMessage[];
	userInput: string;
	dataModel: string;
	temperature: number;
}

export interface GetResponseOutput {
	modelResponse: string;
	chatHistory: ChatMessage[];
}

export default langChainDefs;
