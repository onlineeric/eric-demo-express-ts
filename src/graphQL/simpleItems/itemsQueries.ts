import items from "./itemsStore";

export const getItemQuery = (_: any, { id }: { id: string }) => items.find((item) => item.id === id);
