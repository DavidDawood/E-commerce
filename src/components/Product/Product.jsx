import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
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
    const itemList = GetItemDataFromSessionStorage();
    const Product = GetItemById(itemList, ProductId);
    const variantName = useRef();

    const [image, setImage] = useState(Product.variants[0].img);
    const [price, setPrice] = useState(Product.variants[0].price);

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
        <div>
            <span>
                <h2>{Product.name}</h2>
                <ul>
                    <li>
                        Shipping from: {Product.sellerLocation[0]},{" "}
                        {Product.sellerLocation[1]}, {Product.sellerLocation[2]}
                        , {Product.sellerLocation[3]}
                    </li>
                    <li>Price: ${price}</li>
                    <select onChange={UpdateImageName} ref={variantName}>
                        {Product.variants.map((x) => (
                            <option key={x.name} value={x.name}>
                                {x.name}
                            </option>
                        ))}
                    </select>
                </ul>
                <button onClick={AddItemToCart}>
                    Add To Cart{" "}
                    <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                </button>
            </span>
            <img src={image} alt="" />
        </div>
    );
}

export default Product;
