import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import sellerSlice from "./sellerSlice";
import orderSlice from "./orderSlice";
import customerSlice from "./customerSlice";
import adminSlice from "./adminSlice";

const store = configureStore({
    reducer:{
        productList: productSlice,
        sellers: sellerSlice,
        orders: orderSlice,
        customers: customerSlice,
        admin: adminSlice,
    }
})

export default store;