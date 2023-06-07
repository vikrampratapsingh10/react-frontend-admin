import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../webApi/api";

export const fetchSeller = createAsyncThunk("/seller/seller-list",async()=>{
    let response = await axios.get(api.SELLER_COUNT);
    if(response.data.status)
      return response.data.seller
})

const slice = createSlice({
    name: "seller",
    initialState:{
        sellers:[],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchSeller.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchSeller.fulfilled,(state,action)=>{
            state.sellers = action.payload;
            state.isLoading =  false;
        });
        builder.addCase(fetchSeller.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong"
            
        })
    }
})

export default slice.reducer;