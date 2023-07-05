import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export let ChangePasswordUser=createAsyncThunk(
    "ChangePassword/ChangePasswordSlice",async (values)=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.put("https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword",values,{headers:HEADERS}
    )
    .then((respons)=>respons)
    .catch((err)=>err)})
export let ChangeInfo=createAsyncThunk(
    "ChangeInfo/ChangeInfoSlice",async (values)=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.put("https://route-ecommerce.onrender.com/api/v1/users/updateMe/",values,{headers:HEADERS}
    )
    .then((respons)=>respons)
    .catch((err)=>err)})

export let CashOrder=createAsyncThunk(
    "CashOrder/CashOrderSlice",async (id,values)=>
    
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${id}?url=https://mahmoud564.github.io`,{shippingAddress:values},{headers:HEADERS}
    )
    .then((respons)=>respons)
    .catch((err)=>err)})
export let CashOrder2=createAsyncThunk(
    "CashOrder2/CashOrder2Slice",async (id,values)=>
    
{ let HEADERS={"token":localStorage.getItem("token")}
console.log(id);
console.log(values);
   return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${id}`,{shippingAddress:values},{headers:HEADERS}
    )
    .then((respons)=>respons)
    .catch((err)=>err)})
let initialState={
password:"",
Info:""
}
export let UserInfo=createSlice({
    name:"User",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(ChangePasswordUser.fulfilled,(state,action)=>{state.password=action.payload})
        builder.addCase(ChangeInfo.fulfilled,(state,action)=>{state.Info=action.payload})

    }
    
})
// eslint-disable-next-line no-empty-pattern
export let{}=UserInfo.actions
export let UserInfoReducer=UserInfo.reducer