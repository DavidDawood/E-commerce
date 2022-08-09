import { firebase } from "../firebase.js";
import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
} from "firebase/firestore/lite";
import { NoItemFound } from "./errors.js";

export const GetItemData = async () => {
    const itemSnapshot = await getDocs(collection(firebase, "items"));
    const itemList = itemSnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() };
    });
    return itemList;
};
export const AddAllItemsToStorage = async () => {
    const aquiredItems = await GetItemData();
    sessionStorage.setItem("ProductPreLoad", JSON.stringify(aquiredItems));
    sessionStorage.setItem("CartProducts", JSON.stringify([]));
};
export const GetItemDataFromSessionStorage = () => {
    const ProductPreloadValue = JSON.parse(
        sessionStorage.getItem("ProductPreLoad"),
    );
    return ProductPreloadValue;
};
export const RemoveItemData = async (WholeCart) => {
    // delete the item, then remake the new data
    WholeCart.forEach(async (element) => {
        const itemRef = doc(firebase, "items", element.id);
        const firebaseItem = await (await getDoc(itemRef)).data();

        element.variants.forEach((x) => {
            const firebaseItemVariant = firebaseItem.variants.find(
                (z) => z.name === x.name,
            );
            firebaseItemVariant.quantity -= x.quantity;
        });
        const totalVariantQuantity = firebaseItem.variants.reduce(
            (prev, current) => {
                return (prev += current.quantity);
            },
            0,
        );
        if (totalVariantQuantity <= 0) {
            deleteDoc(itemRef);
        } else {
            setDoc(itemRef, firebaseItem);
        }
    });
};
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
