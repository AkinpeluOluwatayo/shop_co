import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./actions/UserLoginSlice";
import productReducer from "./actions/ProductSlice"; // ✅ import product slice

export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer, // ✅ match key with useSelector
    },
});

export default store;
