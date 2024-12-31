import { createItemMutation, deleteItemMutation, updateItemMutation } from "./itemsMutations";
import { getItemQuery } from "./itemsQueries";
import simpleItems from "./itemsStore";

const itemsResolvers = {
	Query: {
		getSimpleItem: getItemQuery,
		getSimpleItems: () => simpleItems,
	},
	Mutation: {
		createSimpleItem: createItemMutation,
		updateSimpleItem: updateItemMutation,
		deleteSimpleItem: deleteItemMutation,
	},
};

export default itemsResolvers;