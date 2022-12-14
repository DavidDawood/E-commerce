import React, { useEffect, useState } from "react";
import { GetCartItems, SaveCart } from "./../../services/cart";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Cart.module.scss";
import {
    AddAllItemsToStorage,
    GetItemDataFromSessionStorage,
    RemoveItemData,
} from "../../services/items";

function Cart() {
    const navigate = useNavigate();
    const InitalCart = () => {
        try {
            return GetCartItems();
        } catch (e) {
            return e.message;
        }
    };

    const [currentCart, setCurrentCart] = useState(InitalCart());
    useEffect(() => {
        SaveCart(currentCart);
    }, [currentCart]);
    const GetTotalPrice = () => {
        let value = currentCart.reduce((prev, current) => {
            return (prev += current.variants.reduce((varPrev, varCurrent) => {
                return (varPrev += varCurrent.price * varCurrent.quantity);
            }, 0));
        }, 0);
        value = value.toFixed(2);
        return value;
    };
    const SubmitCart = async () => {
        await RemoveItemData(currentCart);
        setCurrentCart([]);
        await AddAllItemsToStorage();
        alert(`You bought all items in the cart for $${GetTotalPrice()}`);
    };

    const DisplayCart = () => {
        return (
            <div>
                <p>Total Price: ${GetTotalPrice()}</p>
                {currentCart.map((x) =>
                    CartItem(x, setCurrentCart, currentCart),
                )}
                <button
                    className={styles.Container__button}
                    onClick={() => SubmitCart()}
                >
                    <p>Purchase</p>
                </button>
            </div>
        );
    };
    return (
        <div className={styles.Container}>
            <h1 className={styles.Container__Title}>Cart</h1>
            <button
                className={styles.Container__button}
                onClick={() => navigate("/Search/")}
            >
                <p>Back to shopping</p>
            </button>
            {currentCart.length === 0 && <p>Cart is empty</p>}
            {currentCart.length !== 0 && DisplayCart()}
        </div>
    );
}

function CartItem(Product, setCurrentCart, currentCart) {
    const GetTotalVariantPrice = () => {
        let amount = Product.variants.reduce((prev, current) => {
            return (prev += current.price * current.quantity);
        }, 0);
        amount = amount.toFixed(2);
        return amount;
    };
    const AddVariant = (variantName) => {
        // clone the current cart and adjust the quantity of it, and resave it
        const cartClone = [...currentCart];
        const cloneProduct = cartClone.find((x) => x.name === Product.name);
        const variant = cloneProduct.variants.find(
            (x) => x.name === variantName,
        );

        const currentItemsVariantCount = GetItemDataFromSessionStorage()
            .find((x) => x.id === Product.id)
            .variants.find((x) => x.name === variantName);

        ++cloneProduct.quantity;
        ++variant.quantity;
        if (variant.quantity > currentItemsVariantCount.quantity)
            variant.quantity = currentItemsVariantCount.quantity;

        setCurrentCart(cartClone);
    };
    const RemoveVariant = (variantName) => {
        // clone the current cart and adjust the quantity of it, and its variant, if the variant is below is 0 or less, remove, if the items quantity total is 0 or less, remove it completely
        let cartClone = [...currentCart];
        let cloneProduct = cartClone.find((x) => x.name === Product.name);
        const variant = cloneProduct.variants.find(
            (x) => x.name === variantName,
        );
        --variant.quantity;
        --cloneProduct.quantity;

        if (variant.quantity <= 0)
            cloneProduct.variants = cloneProduct.variants.filter(
                (x) => x.name !== variant.name,
            );

        if (cloneProduct.quantity <= 0)
            cartClone = cartClone.filter((x) => x.name !== Product.name);

        setCurrentCart(cartClone);
    };
    return (
        <div key={Product.id}>
            <NavLink
                className={styles.HeaderLink}
                to={`/Product/${Product.id}`}
            >
                <h2> {Product.name}</h2>
            </NavLink>
            <p>
                Shipping from: {Product.sellerLocation[0]},{" "}
                {Product.sellerLocation[1]}, {Product.sellerLocation[2]},{" "}
                {Product.sellerLocation[3]}
                Price: ${GetTotalVariantPrice()}
                Variants:
                <ul>
                    {Product.variants.map((x) => (
                        <li key={x.name}>
                            {x.name} :{" "}
                            <button
                                className={styles.Container__button}
                                onClick={() => RemoveVariant(x.name)}
                            >
                                -
                            </button>{" "}
                            {x.quantity}{" "}
                            <button
                                className={styles.Container__button}
                                onClick={() => AddVariant(x.name)}
                            >
                                +
                            </button>{" "}
                            x ${x.price}
                        </li>
                    ))}
                </ul>
            </p>
        </div>
    );
}

export default Cart;
