import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/productDetailsPage/ProductDetails.jsx";
import Home from "./components/homepage/Home.jsx"; // fix this
import Login from "./components/auth/login/Login.jsx";
import Signup from "./components/auth/signup/Signup.jsx";
import Landing from "./components/landingpage/Landing.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
    );
}

export default App;
