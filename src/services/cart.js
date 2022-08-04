import ErrorList from "./errors";
const cartItems = [];
export const GetCartItems = () => {
    return cartItems;
};
export const RemoveItemCount = (item) => {
    item.quantity--;
    if (item.quantity < 1) RemoveCartItem(item);
};
export const AddItemCount = (item) => {
    item.quantity++;
};
export const RemoveCartItem = (item) => {
    cartItems.filter((x) => x.id !== item.id);
    if (!cartItems || cartItems.length === 0) throw ErrorList.CartEmpty;
    return true;
};
export const AddCartItem = (item) => {
    if (cartItems.includes(item)) {
        AddItemCount(item);
    } else {
        cartItems.push(item);
    }
};

// checkout will have this with an added property,
// quantity: 3,  items total of that type added

// const ItemLayout = {
//     id: "417x7rn3l24%%#L@km4",                                     represents the type of item, e.g. air fryer, Fridge, computer etc
//     variants: {color: "Aqua", img: "https"},                       variants that are currently added to that item in a list
//     itemPrice: "$24.95",                                           independant price of each item
//     sellerLocation = ["Banguet Street", "4286","QLD","Australia"]  address of seller
// };
