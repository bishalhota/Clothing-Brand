import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//function to load cart from storage

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

//helper function to save cart to local storage
const saveCartToStorage = (cart) =>{
    localStorage.setItem("cart", JSON.stringify(cart));
};

//Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart",async ({userId,guestId},{rejectWithValue}) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            params:{userId,guestId},
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
})

//add an item to cart
export const addToCart = createAsyncThunk("cart/addToCart",async ({productId,quantity,size,color,guestId,userId},{rejectWithValue}) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`,{
            productId,
            quantity,
            size,
            color,
            guestId,
            userId,
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})