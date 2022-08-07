import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Nav from "./containers/Nav";
import Footer from "./containers/Footer";
import Cart from "./containers/Cart";
import Home from "./containers/Home";
import ProductScreen from "./containers/ProductScreen/ProductScreen";
import Product from "./components/Product";
import { useEffect } from "react";
import { GetItemData } from "./services/items";

function App() {
    const AddAllItemsToStorage = async () => {
        const aquiredItems = await GetItemData();
        sessionStorage.setItem("ProductPreLoad", JSON.stringify(aquiredItems));
        sessionStorage.setItem("CartProducts", JSON.stringify([]));
    };
    useEffect(() => {
        AddAllItemsToStorage();
    }, []);
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/shopping_cart" element={<Cart />} />
                <Route path="/Search/:searchTerm" element={<ProductScreen />} />
                <Route path="/Search/" element={<ProductScreen />} />
                <Route path="/Product/:ProductId" element={<Product />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
