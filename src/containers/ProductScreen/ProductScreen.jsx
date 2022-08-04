import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductScreen.module.scss";

function ProductScreen() {
    const { searchTerm } = useParams();

    useEffect(() => {}, [searchTerm]);

    return (
        <div>{searchTerm && <h2>Found results for '{searchTerm}'...</h2>}</div>
    );
}

export default ProductScreen;
