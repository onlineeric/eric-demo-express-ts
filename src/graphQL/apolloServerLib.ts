import { gql } from "apollo-server-express";
import itemsDefs from "./simpleItems/itemsDefs";
import itemsResolvers from "./simpleItems/itemsResolvers";
import langChainDefs from "./langChain/langChainDefs";
import langChainResolvers from "./langChain/langChainResolvers";

export const myTypeDefs = gql`
	${itemsDefs}
	${langChainDefs}
	# Add more type definitions here
`;

export const myResolvers = {
	...itemsResolvers,
	...langChainResolvers,
	// Add more resolvers here
};
