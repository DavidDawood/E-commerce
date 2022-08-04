import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FilterFindItem, GetItemData } from "../../services/items";
import styles from "./ProductScreen.module.scss";

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
            }
        };
        wrapper();
    }, [searchTerm]);

    return <div>{searchTerm && <h2>{heading}</h2>}</div>;
}

export default ProductScreen;
