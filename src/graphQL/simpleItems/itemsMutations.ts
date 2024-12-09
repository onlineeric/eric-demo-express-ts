import items from "./itemsStore";

export const createItemMutation = (_: any, { name }: { name: string }) => {
	const newItem = { id: `${items.length + 1}`, name };
	items.push(newItem);
	return newItem;
};

export const updateItemMutation = (_: any, { id, name }: { id: string; name: string }) => {
	const item = items.find((item) => item.id === id);
	if (item) {
		item.name = name;
		return item;
	}
	throw new Error("Item not found");
};

export const deleteItemMutation = (_: any, { id }: { id: string }) => {
	const index = items.findIndex((item) => item.id === id);
	if (index !== -1) {
		items.splice(index, 1);
		return `Item with id ${id} deleted`;
	}
	throw new Error("Item not found");
};
