import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import { Offline } from "react-detect-offline";


export default function Layout({token, settoken,number}) {
  return <>
  <Navbar token={token} settoken={settoken} number={number} />
  <Outlet/>
  <Footer/>
  <Offline><div  className="offline"> <i className="fa-solid fa-wifi"></i> You are offline</div> </Offline>
  </>
}
