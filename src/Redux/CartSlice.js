import axios from "axios";
import { Base } from "./ApiSlice";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export let AddCart=createAsyncThunk("AddCart/AddCartSlice",async (productId)=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.post(`${Base}/api/v1/cart`,
    {productId:productId},{headers:HEADERS})
    .then((respons)=>respons).catch((err)=>err)})



export let GetCart=createAsyncThunk("GetCart/GetCartSlice",async ()=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.get(`${Base}/api/v1/cart`,
    {headers:HEADERS})
    .then((respons)=>respons).catch((err)=>err)})


export let ClearCart=createAsyncThunk("ClearCart/ClearCartSlice",async ()=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.delete(`${Base}/api/v1/cart`,
    {headers:HEADERS})
    .then((respons)=>respons).catch((err)=>err)})

    
export let RemoveCart=createAsyncThunk("RemoveCart/RemoveCartSlice",async (id)=>
{ let HEADERS={"token":localStorage.getItem("token")}
   return axios.delete(`${Base}/api/v1/cart/${id}`,
    {headers:HEADERS})
    .then((respons)=>respons).catch((err)=>err)})

export let UpdateCart=createAsyncThunk("UpdateCart/UpdateCartSlice",async (data)=>
{ let HEADERS={"token":localStorage.getItem("token")}
console.log( data.count);
   return axios.put(`${Base}/api/v1/cart/${data.id}`,{"count": data.count },{headers:HEADERS})
    .then((respons)=>respons)
    .catch((err)=>err)})

let initialState={
    Addcart:null,
    Getcart:null,
    ClearCart:null,
    RemoveCart:null,
    LoadingCart:false,
    CartNumber:0,
    Updatecart:null
}
export let CartSlice = createSlice({
    name:"CartSlice",
    initialState:initialState,
    reducers:{
        isLoadingCart:(state,action)=>{
            state.LoadingCart=true},
        unLoadingCart:(state,action)=>{
            state.LoadingCart=false},

    }
    ,
    extraReducers:(builder)=>
    { builder.addCase(AddCart.fulfilled,(state,action)=>{state.Addcart=action.payload})
            builder.addCase(GetCart.fulfilled,(state,action)=>{state.Getcart=action.payload
if (action.payload?.data?.status==="success") {state.CartNumber=action.payload.data.numOfCartItems}else{state.CartNumber=0}})
            builder.addCase(ClearCart.fulfilled,(state,action)=>{state.ClearCart=action.payload})
            builder.addCase(RemoveCart.fulfilled,(state,action)=>{state.RemoveCart=action.payload})
            builder.addCase(UpdateCart.fulfilled,(state,action)=>{state.Updatecart=action.payload})
        }
})
export let {isLoadingCart,unLoadingCart} = CartSlice.actions
export let CartSliceReducer=CartSlice.reducer