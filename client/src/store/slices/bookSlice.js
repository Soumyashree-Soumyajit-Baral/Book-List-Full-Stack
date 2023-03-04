import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "book",
    initialState: {},
    reducers: {
        setBook(state, action) {
            return action.payload
        }

    }
})

export default bookSlice.reducer;

export const { setBook } = bookSlice.actions;