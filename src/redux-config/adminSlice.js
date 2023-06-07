import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../webApi/api";
import axios from "axios";

export const fetchAdmin = createAsyncThunk("/admin/singin",async(email)=>{
   try{
    let response = await axios.post(api.ADMIN_SIGNIN,{email:email});
    // console.log(response)
    if(response.data.status)
      return response.data.admin
   }catch(err){
    console.log(err);
   }
})

const slice = createSlice({
    name: "admin",
    initialState:{
        admin:null,
        isLoading: false,
        error: null
    },
    reducers:{
        setAdmin: (state,action)=>{
            state.admin = action.payload;
        },
        signOut: (state,action)=>{
            state.admin = null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAdmin.pending,(state,action)=>{
            state.isLoading = true;
        });
        builder.addCase(fetchAdmin.fulfilled,(state,action)=>{
            state.admin = action.payload;
            state.isLoading =  false;
        });
        builder.addCase(fetchAdmin.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = "Oops! something went wrong"

        })
    }
})

export const {setAdmin,signOut} = slice.actions
export default slice.reducer;