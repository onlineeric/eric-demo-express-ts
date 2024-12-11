import { gql } from "apollo-server-express";

// GraphQL type definitions and resolvers
const itemsDefs = gql`
	type Item {
		id: ID!
		name: String!
		contact: Contact
	}

	type Contact {
		email: String
		address: String
	}

	type Query {
		getItem(id: ID!): Item
		getItems: [Item]
	}

	type Mutation {
		createItem(item: CreateItemInput!): Item
		updateItem(item: UpdateItemInput!): Item
		deleteItem(id: ID!): String
	}

	input CreateItemInput {
		name: String!
		contact: ContactInput
	}

	input UpdateItemInput {
		id: ID!
		name: String!
		contact: ContactInput
	}

	input ContactInput {
		email: String
		address: String
	}
`;

// typescript interfaces
export interface Contact {
	email?: string;
	address?: string;
}

export interface CreateItemInput {
	name: string;
	contact?: Contact;
}

export interface Item {
	id: string;
	name: string;
	contact?: Contact;
}

export default itemsDefs;