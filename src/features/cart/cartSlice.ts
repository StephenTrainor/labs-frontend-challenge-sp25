import courses from "../../data/courses.json"
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialCartState = {}
courses.forEach(course => {
    initialCartState[`${course.dept}${course.number}`] = false
});

export const cartSlice = createSlice({
    name: "cartItems",
    initialState: initialCartState,
    reducers: {
        removeCartItem: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                [action.payload]: false,
            }
        },
        addCartItem: (state, action: PayloadAction<string>) => {
            return {
                ...state,
                [action.payload]: true,
            }
        }
    }
});

export const getCart = (state: RootState) => state.cartItems;
export const { removeCartItem, addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
