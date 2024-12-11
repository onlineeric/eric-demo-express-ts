import items from "./itemsStore";
import { CreateItemInput, Item } from "./itemsDefs";

export const createItemMutation = (_: any, { item }: { item: CreateItemInput }) => {
	const newItem = { id: `${items.length + 1}`, name: item.name, contact: item.contact } as Item;
	items.push(newItem);
	return newItem;
};

export const updateItemMutation = (_: any, { item }: { item: Item }) => {
	const existingItem = items.find((i) => i.id === item.id);
	if (existingItem) {
		existingItem.name = item.name;
		existingItem.contact = item.contact;
		return existingItem;
	}
	throw new Error(`Item not found by id: ${item.id}`);
};

export const deleteItemMutation = (_: any, { id }: { id: string }) => {
	const index = items.findIndex((item) => item.id === id);
	if (index !== -1) {
		items.splice(index, 1);
		return `Item with id ${id} deleted`;
	}
	throw new Error("Item not found");
};
