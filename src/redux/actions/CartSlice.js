import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",

    initialState: {
        cartItems: [],
        totalQty: 0,
        totalPrice: 0,
    },

    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.cartItems.find(i => i.id === item.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.cartItems.push({ ...item, quantity: 1 });
            }

            state.totalQty += 1;
            state.totalPrice += item.price;
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find(i => i.id === id);

            if (item) {
                state.totalQty -= item.quantity;
                state.totalPrice -= item.price * item.quantity;
            }

            state.cartItems = state.cartItems.filter(i => i.id !== id);
        },

        increaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find(i => i.id === id);

            if (item) {
                item.quantity += 1;
                state.totalQty += 1;
                state.totalPrice += item.price;
            }
        },

        decreaseQty: (state, action) => {
            const id = action.payload;
            const item = state.cartItems.find(i => i.id === id);

            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalQty -= 1;
                state.totalPrice -= item.price;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.totalQty = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
