import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export let Base=`https://ecommerce.routemisr.com`


export let CategoriesProduct=createAsyncThunk("CategoriesHome/CategoriesProduct",
    async ()=>{let response=await axios.get(`${Base}/api/v1/categories`)
        return response.data})

        
export let Products=createAsyncThunk("ProductsHome/Products",
    async ()=>{let response=await axios.get(`${Base}/api/v1/Products`)
        return response.data})


export let ProductsDetails=createAsyncThunk(
    "ProductDetails/ProductDetails",
    async (param)=>{let response=await axios.get(`${Base}/api/v1/Products/${param}`)
        return response.data
    }
)
let initialState={
    categoriesProduct:null,
    Products:null,
    ProductDetails:null}

let ApiSlice=createSlice({
    name:"ApiSlice",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(CategoriesProduct.fulfilled,(state,action)=>
        {state.categoriesProduct=action.payload},

        builder.addCase(Products.fulfilled,(state,action)=>
        {state.Products=action.payload}),

        builder.addCase(ProductsDetails.fulfilled,(state,action)=>{
            state.ProductDetails=action.payload}))}
})
export let {categoriesProduct} =ApiSlice.actions
export  let ApiSlicereducer= ApiSlice.reducer