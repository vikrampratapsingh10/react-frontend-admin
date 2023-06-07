import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../webApi/api";
import axios from "axios";



export const fetchProduct = createAsyncThunk("/product/product-list",async()=>{
    let response = await axios.get(api.PRODUCT_LIST);
    if(response.data.status)
      return response.data.products
    //   status =true whichgot on postmen products=productlist of backend
})

const slice = createSlice({
    name: "prodcuts",
    initialState:{
        productList:[],
        isLoading: false,
        error: null
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.productList = action.payload;
            state.isLoading =  false;
        });
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong"
            
        })
    }
})

export default slice.reducer;