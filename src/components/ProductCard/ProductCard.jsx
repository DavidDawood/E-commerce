import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ProductCard.module.scss";

function ProductCard({ Product }) {
    return (
        <div className={styles.Container}>
            <h2>{Product.name}</h2>
            <NavLink
                className={styles.Container__image}
                to={`/Product/${Product.id}`}
            >
                <img src={Product.variants[0].img} alt={Product.name} />
            </NavLink>
        </div>
    );
}

export default ProductCard;
