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
export const GetItemDataFromSessionStorage = () => {
    const ProductPreloadValue = JSON.parse(
        sessionStorage.getItem("ProductPreLoad"),
    );
    return ProductPreloadValue;
};
export const RemoveItemData = () => {};
export const AddItemData = () => {};

export const GetItemById = (itemList, id) => {
    const foundItem = itemList.find((x) => x.id === id);
    if (!foundItem) throw NoItemFound;
    return foundItem;
};

export const FilterFindItem = (itemList, searchTerm) => {
    const filteredItems = itemList.filter((item) => {
        return item.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    if (filteredItems.length === 0) throw NoItemFound;
    return filteredItems;
};
