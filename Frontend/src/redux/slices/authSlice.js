import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Retrieve user info and token from localstorage if available
const userFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null;


//Checking for existing guestId in localStorage or creating a new one
const initialGuestId = localStorage.getItem("guestId") || `guest_${Date.now()}`;
localStorage.setItem("guestId", initialGuestId);

//Initial State
const initialState = {
    user: userFromStorage,
    guestId:initialGuestId, 
    loading:false,
    error:null
};

//AsyncThunk to handle login process
export const loginUser = createAsyncThunk("auth/loginUser",async (userData,{rejectWithValue}) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`,userData);
        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);

        return response.data.user; //Return the user object from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



//AsyncThunk to handle Register process
export const registerUser = createAsyncThunk("auth/registerUser",async (userData,{rejectWithValue}) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`,userData);
        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        localStorage.setItem("userToken",response.data.token);

        return response.data.user; //Return the user object from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

 
//Slice
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state) =>{
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`; //reset guestId on logout
            localStorage.removeItem("userInfo");
            localStorage.removeItem("userToken");
            localStorage.setItem("guestId", state.guestId); //set new guestId in localStorage
        },
        generateNewGuestId: (state) =>{
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem("guestId",state.guestId);
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(loginUser.pending ,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.payload?.message || "login failed";
        })

        .addCase(registerUser.pending ,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled,(state,action) =>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(registerUser.rejected,(state,action) =>{
            state.loading = false;
            state.error = action.payload.message;
        });
    },
});

export const {logout, generateNewGuestId} = authSlice.actions;

export default authSlice.reducer;