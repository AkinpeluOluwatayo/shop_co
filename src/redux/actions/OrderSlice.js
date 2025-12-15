import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
    "orders/create",
    async (orderData, thunkAPI) => {
        try {
            const res = await axios.post("/api/orders", orderData);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
);

export const getOrders = createAsyncThunk(
    "orders/getAll",
    async () => {
        const res = await axios.get("/api/orders");
        return res.data;
    }
);

const orderSlice = createSlice({
    name: "orders",

    initialState: {
        orders: [],
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders.push(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default orderSlice.reducer;
