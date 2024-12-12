import { gql } from "apollo-server-express";
import itemsDefs from "./simpleItems/itemsDefs";
import itemsResolvers from "./simpleItems/itemsResolvers";

export const myTypeDefs = gql`
	${itemsDefs}
	# Add more type definitions here
`;

export const myResolvers = {
	...itemsResolvers,
	// Add more resolvers here
};
