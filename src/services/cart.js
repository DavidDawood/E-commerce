export const GetCartItems = () => {
    const items = JSON.parse(sessionStorage.getItem("CartProducts"));
    return items;
};

export const RemoveCartItem = (itemList, item) => {
    const newList = itemList.filter((x) => x.id !== item.id);
    SaveCart(newList);
    return newList;
};

// this whole function basically tests for any duplicate items, if so, add the total quantity and see if the current item im passing through (Which has been filtered to only contain one variant), if the item has a variant matching, simply add the quantity, if not, add it with the rest as a new variant in the cart
export const AddCartItem = (itemList, item) => {
    const foundDuplicate = itemList.find((x) => x.id === item.id);
    const [...rest] = itemList;

    if (foundDuplicate) {
        ++foundDuplicate.quantity;
        const variantDup = foundDuplicate.variants.find(
            (x) => x.name === item.variants[0].name,
        );

        if (variantDup) ++variantDup.quantity;
        else foundDuplicate.variants.push(item.variants[0]);
    } else {
        rest.push({ ...item, quantity: 1 });
    }
    SaveCart(rest);
    return rest;
};
export const SaveCart = (itemList) => {
    if (sessionStorage.getItem("CartProducts"))
        sessionStorage.removeItem("CartProducts");

    sessionStorage.setItem("CartProducts", JSON.stringify(itemList));
};

// add item will also take in a new param of variant name, so i can increase and decrease it as i like in the cart

// change it here, with the add item to cart, have the item
// add the variant too, so both the quantity of the item will increase
// and the quantity of the variant will increase

// with the remove quantity, it will decrease the quantity, if the items total quantity is 0, remove item, if not, keep it, decrease quantity and the variants quatity too, so have it take in another parameter of variant
