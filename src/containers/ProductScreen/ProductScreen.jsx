import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterFindItem, GetItemData } from "../../services/items";
import styles from "./ProductScreen.module.scss";
import ProductCard from "../../components/ProductCard";

function ProductScreen() {
    const { searchTerm } = useParams();
    const [items, setItems] = useState([]);
    const [heading, setHeading] = useState("");

    useEffect(() => {
        const wrapper = async () => {
            const aquiredItems = await GetItemData();
            try {
                setItems(FilterFindItem(aquiredItems, searchTerm));
                setHeading(`Found results for '${searchTerm}'...`);
            } catch (e) {
                setHeading(e.message);
                setItems([]);
            }
        };
        wrapper();
    }, [searchTerm]);

    return (
        <div>
            <div>{searchTerm && <h2>{heading}</h2>}</div>
            <div className={styles.grid}>
                {items.map((item) => (
                    <ProductCard key={item.id} Product={item}></ProductCard>
                ))}
            </div>
        </div>
    );
}

export default ProductScreen;
