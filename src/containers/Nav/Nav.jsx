import React, { useState } from "react";
import styles from "./Nav.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faMagnifyingGlass,
    faHouse,
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
        <div>
            <NavLink to={"/Home"}>
                <FontAwesomeIcon icon={faHouse} size="2x" />
            </NavLink>
            <input
                id="searchTermInput"
                type="search"
                onKeyDown={EnterHandler}
                onChange={UpdateSearchTerm}
                placeholder="Search..."
            />
            <NavLink to={`/Search/${searchTerm}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
            </NavLink>
            <NavLink to={"/shopping_cart"}>
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </NavLink>
        </div>
    );
}

export default Nav;
