import simpleItems from "./itemsStore";
import { CreateSimpleItemInput, SimpleItem } from "./itemsDefs";

export const createItemMutation = (_: any, { item }: { item: CreateSimpleItemInput }) => {
	const newItem = { id: `${simpleItems.length + 1}`, name: item.name, contact: item.contact } as SimpleItem;
	simpleItems.push(newItem);
	return newItem;
};

export const updateItemMutation = (_: any, { item }: { item: SimpleItem }) => {
	const existingItem = simpleItems.find((i) => i.id === item.id);
	if (existingItem) {
		existingItem.name = item.name;
		existingItem.contact = item.contact;
		return existingItem;
	}
	throw new Error(`Item not found by id: ${item.id}`);
};

export const deleteItemMutation = (_: any, { id }: { id: string }) => {
	const index = simpleItems.findIndex((item) => item.id === id);
	if (index !== -1) {
		simpleItems.splice(index, 1);
		return `Item with id ${id} deleted`;
	}
	throw new Error("Item not found");
};
