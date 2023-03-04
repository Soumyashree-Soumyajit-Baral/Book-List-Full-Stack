import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        removeFromCart(state, action) {
            state.splice(action.payload, 1)
        }
    }
})

export default cartSlice.reducer;

export const { addToCart, removeFromCart } = cartSlice.actions;