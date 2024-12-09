import { gql } from "apollo-server-express";

// GraphQL type definitions and resolvers
const itemsDefs = gql`
	type Item {
		id: ID!
		name: String!
	}

	type Query {
		getItem(id: ID!): Item
		getItems: [Item]
	}

	type Mutation {
		createItem(name: String!): Item
		updateItem(id: ID!, name: String!): Item
		deleteItem(id: ID!): String
	}
`;

export default itemsDefs;