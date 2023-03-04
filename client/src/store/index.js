import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import bookSlice from "./slices/bookSlice";

const store = configureStore({
    reducer: {
        carts: cartSlice,
        book: bookSlice
    }
})

export default store;