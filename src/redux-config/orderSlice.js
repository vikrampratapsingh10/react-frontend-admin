import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../webApi/api";
import axios from "axios";



export const fetchOrder = createAsyncThunk("/order/order-list",async()=>{
    let response = await axios.get(api.ORDER_COUNT);
    if(response.data.status)
      return response.data.orders
})

const slice = createSlice({
    name: "seller",
    initialState:{
        orders:[],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchOrder.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchOrder.fulfilled,(state,action)=>{
            state.orders = action.payload;
            state.isLoading =  false;
        });
        builder.addCase(fetchOrder.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong"
            
        })
    }
})

export default slice.reducer;