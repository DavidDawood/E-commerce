import React, { useState } from "react";
import styles from "./Nav.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faMagnifyingGlass,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";

export function Nav() {
    const [searchTerm, setSearchTerm] = useState("");
    const UpdateSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    };
    const navigate = useNavigate();
    const EnterHandler = (event) => {
        if (event.key === "Enter") {
            navigate(`/Search/${searchTerm}`);
        }
    };

    return (
        <div className={styles.Container}>
            <NavLink to={""} className={styles.disableHeader}>
                <h1>Little Astro's Supplies</h1>
            </NavLink>
            <div className={styles.Container__Searchbar}>
                <input
                    id="searchTermInput"
                    type="search"
                    onKeyDown={EnterHandler}
                    onChange={UpdateSearchTerm}
                    placeholder="Search..."
                />
                <NavLink
                    to={`/Search/${searchTerm}`}
                    className={styles.Container__SearchbarMag}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </NavLink>
            </div>
            <NavLink to={"/shopping_cart"} className={styles.disable}>
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </NavLink>
        </div>
    );
}

export default Nav;
