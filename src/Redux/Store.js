import { configureStore } from '@reduxjs/toolkit'
import { Registerreducer } from './RegisterSlice'
import { ApiSlicereducer } from './ApiSlice'
import { CartSliceReducer } from './CartSlice'



export const store = configureStore({
  reducer: {Register:Registerreducer,
  api:ApiSlicereducer,
  Cart:CartSliceReducer
},
})