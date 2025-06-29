import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/ProductSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        products:productReducer
    },
});

export default store;