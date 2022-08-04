import React from "react";
import styles from "./ProductCard.module.scss";

function ProductCard({ Product }) {
    return <div>{Product.name}</div>;
}

export default ProductCard;
