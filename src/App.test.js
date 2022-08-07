import { render, screen } from "@testing-library/react";
import App from "./App";
import { FilterFindItem, GetItemById } from "./services/items";
import { NoItemFound } from "./services/errors";
import {
    RemoveCartItem,
    AddCartItem,
    AddItemCount,
    RemoveItemCount,
} from "./services/cart.js";

const ItemLayout = [
    {
        name: "Air Fryer",
        id: "417x7rn3l24%%#L@km4",
        variants: { color: "Aqua", img: "https" },
        itemPrice: "$24.95",
        sellerLocation: ["Banguet Street", "4286", "QLD", "Australia"],
    },
    {
        name: "Fridge",
        id: "45254%%#AJf@km4",
        variants: { color: "Silver", img: "https" },
        itemPrice: "$24.95",
        sellerLocation: ["Zephior", "7614", "NSW", "Australia"],
    },
    {
        name: "Computer",
        id: "Svx%%#L@kgsDm4",
        variants: { color: "Black", img: "https" },
        itemPrice: "$499.99",
        sellerLocation: ["StoreFront", "2586", "VIC", "Australia"],
    },
    {
        name: "Calculator",
        id: "Svx%%#L@kgsDm4",
        variants: { color: "Black", img: "https" },
        itemPrice: "$14.99",
        sellerLocation: ["StoreFront", "2586", "VIC", "Australia"],
    },
];
const airFryer = {
    name: "Air Fryer",
    id: "417x7rn3l24%%#L@km4",
    variants: { color: "Aqua", img: "https" },
    itemPrice: "$24.95",
    sellerLocation: ["Banguet Street", "4286", "QLD", "Australia"],
};
const computer = {
    name: "Computer",
    id: "Svx%%#L@kgsDm4",
    variants: { color: "Black", img: "https" },
    itemPrice: "$499.99",
    sellerLocation: ["StoreFront", "2586", "VIC", "Australia"],
};
const calculator = {
    name: "Calculator",
    id: "Svx%%#L@kgsDm4",
    variants: { color: "Black", img: "https" },
    itemPrice: "$14.99",
    sellerLocation: ["StoreFront", "2586", "VIC", "Australia"],
};

const CartItemList = [
    {
        id: 23423,
        quantity: 1,
    },
    {
        id: 662,
        quantity: 3,
    },
    {
        id: 825136,
        quantity: 5,
    },
];
const itemAdd = {
    id: 87453,
};

const itemRemove = {
    id: 825136,
    quantity: 5,
};

describe("Pure Function Testing", () => {
    it("Filter Search", () => {
        expect(FilterFindItem(ItemLayout, "Air F")).toStrictEqual([airFryer]);
        expect(FilterFindItem(ItemLayout, "c")).toStrictEqual([
            computer,
            calculator,
        ]);
        expect(() => FilterFindItem(ItemLayout, "lkajsdlakjsd")).toThrowError(
            NoItemFound,
        );
    });

    it("Find Item By Id", () => {
        expect(GetItemById(ItemLayout, "417x7rn3l24%%#L@km4")).toStrictEqual(
            airFryer,
        );
        expect(() => GetItemById(ItemLayout, "ada*J3nAKDdD")).toThrowError(
            NoItemFound,
        );
        expect(() => GetItemById(ItemLayout, "ID: 14")).toThrowError(
            NoItemFound,
        );
    });

    it("Add Cart Item", () => {
        expect(AddCartItem(CartItemList, itemAdd)).toStrictEqual([
            {
                id: 23423,
                quantity: 1,
            },
            {
                id: 662,
                quantity: 3,
            },
            {
                id: 825136,
                quantity: 5,
            },
            {
                id: 87453,
                quantity: 1,
            },
        ]);
    });
    it("Remove Cart Item", () => {
        expect(RemoveCartItem(CartItemList, itemRemove)).toStrictEqual([
            {
                id: 23423,
                quantity: 1,
            },
            {
                id: 662,
                quantity: 3,
            },
        ]);
    });
});
