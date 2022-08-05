import { CartEmpty } from "./errors";
export const GetCartItems = () => {
    if (!sessionStorage.getItem("CartProducts")) throw CartEmpty;
    return sessionStorage.getItem("CartProducts");
};
export const RemoveItemCount = (item) => {};
export const AddItemCount = (item) => {};
export const RemoveCartItem = (item) => {};
export const AddCartItem = (item) => {};

// checkout will have this with an added property,
// quantity: 3,  items total of that type added

// const ItemLayout = {
//     name: "Air Fryer",
//     id: "417x7rn3l24%%#L@km4",                                     represents the type of item, e.g. air fryer, Fridge, computer etc
//     variants: {color: "Aqua", img: "https"},                       variants that are currently added to that item in a list
//     itemPrice: "$24.95",                                           independant price of each item
//     sellerLocation: ["Banguet Street", "4286","QLD","Australia"]  address of seller
// };
