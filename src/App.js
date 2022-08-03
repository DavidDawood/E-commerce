import { useEffect } from "react";
import { GetItemData } from "./services/items";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
function App() {
    useEffect(() => {
        GetItemData().then((x) => console.log(x));
    }, []);
    return (
        <div className="App">
            <Nav />
            <Routes>
                <Route path="/shopping_cart" element={<></>}></Route>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
