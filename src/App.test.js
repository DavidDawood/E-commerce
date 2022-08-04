import { render, screen } from "@testing-library/react";
import App from "./App";
import { FilterFindItem } from "./services/items";
import { NoItemFound } from "./services/errors";

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

describe("Pure Function Testing", () => {
    it("FilterSearch", () => {
        expect(FilterFindItem(ItemLayout, "Air F")).toStrictEqual([airFryer]);
        expect(FilterFindItem(ItemLayout, "c")).toStrictEqual([
            computer,
            calculator,
        ]);
        expect(() => FilterFindItem(ItemLayout, "lkajsdlakjsd")).toThrowError(
            NoItemFound,
        );
    });
});
