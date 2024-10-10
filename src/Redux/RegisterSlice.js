import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Base } from "./ApiSlice";

export let RegisterSliceApi=createAsyncThunk("RegisterSlice/RegisterSliceApi",
async function RegisterApi(body){
    let response=await axios.post(`${Base}/api/v1/auth/signup`,body)
    .catch((error)=> error.response)
    return response.data})   

    
export let loginSliceApi=createAsyncThunk(`loginSlice/loginSliceApi`,
async function loginApi(body){
    let response=await axios.post(`${Base}/api/v1/auth/signin`,body)
    .catch((error)=> error.response)
    return response.data})   

    export  let settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        slidesToScroll: 7,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5,
              infinite: true,
              dots: true,
              autoplay: true,
              autoplaySpeed: 2000
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 5,
              initialSlide: 2,
              autoplay: true,
              autoplaySpeed: 2000
            }
          },
          {
            breakpoint: 570,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              autoplay: true,
              autoplaySpeed: 2000
            }
          },
          {
            breakpoint: 360,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 2000
            }
          }
        ]
      };
let initialState={
    responseRegister:null,
    loading: 'idle',
    Loading:false,
    error: null,
    responselogin:null,
    token:"",
    decoded:""
  }
export let RegisterSlice=createSlice({
    name:"RegisterSlice",
    initialState:initialState,
    reducers:{
        isLoading:(state,action)=>{
            state.Loading=true},
        unLoading:(state,action)=>{
            state.Loading=false},
        decode:(state,action)=>{
            if (localStorage.getItem("token")!=null) {
              state.token= localStorage.getItem("token")
              state.decoded=jwt_decode(state.token)
            }
              
            }
           
    },
    extraReducers:(builder)=>{
        builder.addCase(RegisterSliceApi.fulfilled,(state,action)=>{
            state.responseRegister=action.payload
        },(loginSliceApi.fulfilled,(state,action)=>{
            state.responselogin=action.payload
        }))
    }
})
export  let {isLoading,unLoading,decode} =RegisterSlice.actions
export  let Registerreducer= RegisterSlice.reducer