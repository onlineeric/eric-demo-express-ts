import simpleItems from "./itemsStore";

export const getItemQuery = (_: any, { id }: { id: string }) => simpleItems.find((item) => item.id === id);
