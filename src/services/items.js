import { firebase } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore/lite";
import { NoItemFound } from "./errors.js";

export const GetItemData = async () => {
    const itemSnapshot = await getDocs(collection(firebase, "items"));
    const itemList = itemSnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() };
    });
    return itemList;
};
export const RemoveItemData = () => {};
export const AddItemData = () => {};

export const FilterFindItem = (itemList, searchTerm) => {
    const filteredItems = itemList.filter((item) => {
        return item.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    if (filteredItems.length === 0) throw NoItemFound;
    return filteredItems;
};
