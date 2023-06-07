import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../webApi/api";
import axios from "axios";



export const fetchCustomer = createAsyncThunk("/customer/customer-list",async()=>{
    let response = await axios.get(api.CUSTOMER_COUNT);
    if(response.data.status)
      return response.data.customer
})

const slice = createSlice({
    name: "seller",
    initialState:{
        customers:[],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchCustomer.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchCustomer.fulfilled,(state,action)=>{
            state.customers = action.payload;
            state.isLoading =  false;
        });
        builder.addCase(fetchCustomer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong"
            
        })
    }
})

export default slice.reducer;