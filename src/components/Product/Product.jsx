import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    AddAllItemsToStorage,
    GetItemById,
    GetItemDataFromSessionStorage,
} from "../../services/items";
import styles from "./Product.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { GetCartItems, AddCartItem } from "../../services/cart";

function Product() {
    const navigate = useNavigate();
    const { ProductId } = useParams();
    const [itemList, setItemList] = useState(GetItemDataFromSessionStorage());
    const Product = GetItemById(itemList, ProductId);
    const variantName = useRef();

    const [image, setImage] = useState(Product.variants[0].img);
    const [price, setPrice] = useState(Product.variants[0].price);
    const [quantity, setQuantity] = useState(Product.variants[0].quantity);

    // update it without reloading the page
    useEffect(() => {
        AddAllItemsToStorage();
        setItemList(GetItemDataFromSessionStorage());
        const Product = GetItemById(itemList, ProductId);

        setImage(Product.variants[0].img);
        setPrice(Product.variants[0].price);
        setQuantity(Product.variants[0].quantity);
    }, []);
    const UpdateImageName = () => {
        const GetVariant = () => {
            const variant = Product.variants.find(
                (x) => x.name === variantName.current.value,
            );
            return variant;
        };
        const variant = GetVariant();
        setImage(variant.img);
        setPrice(variant.price);
        setQuantity(variant.quantity);
    };

    // This is so only the variant will be added instead of all variants, to the cart list
    const AddItemToCart = () => {
        navigate("/shopping_cart");
        const filteredProduct = { ...Product };

        const variant = Product.variants.find(
            (x) => x.name === variantName.current.value,
        );
        filteredProduct.variants = [{ ...variant, quantity: 1 }];
        AddCartItem(GetCartItems(), filteredProduct);
    };

    return (
        <div className={styles.Container}>
            <h2>{Product.name}</h2>
            <ul>
                <li>
                    <p>
                        Shipping from: {Product.sellerLocation[0]},{" "}
                        {Product.sellerLocation[1]}, {Product.sellerLocation[2]}
                        , {Product.sellerLocation[3]}
                    </p>
                </li>
                <li>
                    <p>Price: ${price}</p>
                </li>
                <li>
                    <p>Stock Left: x{quantity}</p>
                </li>
                <li>
                    <select
                        className={styles.Container__select}
                        onChange={UpdateImageName}
                        ref={variantName}
                    >
                        {Product.variants.map((x) => (
                            <option key={x.name} value={x.name}>
                                {x.name}
                            </option>
                        ))}
                    </select>{" "}
                </li>
                <img className={styles.Container__image} src={image} alt="" />
            </ul>{" "}
            <button className={styles.Container__Cart} onClick={AddItemToCart}>
                <p>Add To Cart</p>{" "}
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </button>
        </div>
    );
}

export default Product;
