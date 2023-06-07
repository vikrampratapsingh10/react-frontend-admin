import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchOrderItem = createAsyncThunk("customer/orderitem",async ()=>{

})

const slice = createSlice({
    name: "customer-orderItem",
    initialState:{
        orderItem:[],
        isLoading: false,
        error:null
    }
})