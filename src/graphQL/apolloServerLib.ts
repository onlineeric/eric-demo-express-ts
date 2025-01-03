import { gql } from "apollo-server-express";
import itemsDefs from "./simpleItems/itemsDefs";
import itemsResolvers from "./simpleItems/itemsResolvers";
import langChainDefs from "./langChain/langChainDefs";
import langChainResolvers from "./langChain/langChainResolvers";
import openAiResolvers from "./openAi/openAiResolvers";
import openAiDefs from "./openAi/openAiDefs";

export const myTypeDefs = gql`
	${itemsDefs}
	${langChainDefs}
	${openAiDefs}
	# Add more type definitions here
`;

export const myResolvers = {
	Query: {
		...itemsResolvers.Query,
		...langChainResolvers.Query,
	},
	Mutation: {
		...itemsResolvers.Mutation,
		...openAiResolvers.Mutation,
	},
};
