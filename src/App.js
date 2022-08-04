import { useEffect } from "react";
import { GetItemData } from "./services/items";
import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Nav from "./containers/Nav";
import Footer from "./containers/Footer";
import Cart from "./containers/Cart";
import ProductScreen from "./containers/ProductScreen/ProductScreen";

function App() {
    const navigate = useNavigate();
    useEffect(() => navigate("/Home"), []);
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/Home" element={<>Home</>} />
                <Route path="/shopping_cart" element={<Cart />} />
                <Route path="/Search/:searchTerm" element={<ProductScreen />} />
                <Route path="/Search/" element={<ProductScreen />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
