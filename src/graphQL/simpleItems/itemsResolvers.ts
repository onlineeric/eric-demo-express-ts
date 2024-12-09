import { createItemMutation, deleteItemMutation, updateItemMutation } from "./itemsMutations";
import { getItemQuery } from "./itemsQueries";
import items from "./itemsStore";

const itemsResolvers = {
	Query: {
		getItem: getItemQuery,
		getItems: () => items,
	},
	Mutation: {
		createItem: createItemMutation,
		updateItem: updateItemMutation,
		deleteItem: deleteItemMutation,
	},
};

export default itemsResolvers;