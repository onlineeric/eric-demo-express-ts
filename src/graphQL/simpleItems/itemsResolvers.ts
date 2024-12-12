import { createItemMutation, deleteItemMutation, updateItemMutation } from "./itemsMutations";
import { getItemQuery } from "./itemsQueries";
import simpleItems from "./itemsStore";

const itemsResolvers = {
	Query: {
		getItem: getItemQuery,
		getItems: () => simpleItems,
	},
	Mutation: {
		createItem: createItemMutation,
		updateItem: updateItemMutation,
		deleteItem: deleteItemMutation,
	},
};

export default itemsResolvers;