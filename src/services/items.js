import { firebase } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore/lite";

export const GetItemData = async () => {
    const itemSnapshot = await getDocs(collection(firebase, "items"));
    const itemList = itemSnapshot.docs.map((item) => {
        return { id: item.id, ...item.data() };
    });
    return itemList;
};
export const RemoveItemData = () => {};
export const AddItemData = () => {};
