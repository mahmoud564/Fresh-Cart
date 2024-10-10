import React, { useEffect } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import Slidere from '../Slider/Slider'
import FitshProduct from '../FitshProduct/FitshProduct'
import { useDispatch } from 'react-redux'
import { GetCart } from '../../Redux/CartSlice'




export default function Home() {
  let Dispatch = useDispatch()
  useEffect(() => {
    Dispatch(GetCart())
  }, [])
  return <>
  <div className=' container'>
  <MainSlider/>
  <Slidere/>
  <FitshProduct/>

  </div>
  </>
}
