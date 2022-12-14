import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Nav from "./containers/Nav";
import Footer from "./containers/Footer";
import Cart from "./containers/Cart";
import Home from "./containers/Home";
import ProductScreen from "./containers/ProductScreen/ProductScreen";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import { AddAllItemsToStorage } from "./services/items";

function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const wrapper = async () => {
            await AddAllItemsToStorage();
            setIsLoaded(true);
        };
        wrapper();
    }, []);

    // dont load the website till we have gathered item data or else we wont be able to load the Carousel
    return (
        <div className="App">
            {isLoaded && (
                <div className="App__Container">
                    {" "}
                    <Nav />
                    <Routes>
                        <Route path="" element={<Home />} />
                        <Route path="/shopping_cart" element={<Cart />} />
                        <Route
                            path="/Search/:searchTerm"
                            element={<ProductScreen />}
                        />
                        <Route path="/Search/" element={<ProductScreen />} />
                        <Route
                            path="/Product/:ProductId"
                            element={<Product />}
                        />
                    </Routes>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default App;
