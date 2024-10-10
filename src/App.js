import './App.css';
import Layout from './Components/Layout/Layout';
import Root from './Components/Root/Root';
import Login from './Components/Login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import { useEffect, useState } from 'react';
import Product from './Components/Product/Product';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';
import { useDispatch } from 'react-redux';
import { GetCart } from './Redux/CartSlice';
import { decode } from './Redux/RegisterSlice';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import AddAddress from './Components/ChangeInfo/ChangeInfo';
import NotFound from './Components/NotFound/NotFound'
import Allorders from './Components/Allorders/Allorders';
import {Helmet} from "react-helmet";
import CheckOrder from './Components/CheckOrder/CheckOrder';
import CheckOut from './Components/CheckOut/CheckOut';







function App() {

  let Dispatch=useDispatch()
  const [token, settoken] = useState(null)
  function GetToken(){
    if (localStorage.getItem("token")!=null) {
      settoken(localStorage.getItem("token"))}}
useEffect(() => {
  GetToken()
  Dispatch(GetCart())
  Dispatch(decode())
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
let router=createBrowserRouter([{
  path: "/",element:<Layout  token={token} settoken={settoken}/>, children: [
    {index:true,element:<Root><Home/></Root>},
    {path:"/",element:<Root><Home/></Root>},
    {path:"/Fresh-Cart",element:<Root><Home/></Root>},
    {path:"*",element:<NotFound/>},
    {path:"/product",element:<Root><Product/></Root>},
    {path:"/cart",element:<Root><Cart/></Root>},
    {path:"/ProductDetails/:id",element:<Root><ProductDetails/></Root>},
    {path:"product/ProductDetails/:id",element:<Root><ProductDetails/></Root>},
    {path:"/AddAddress",element:<Root><AddAddress/></Root>},
    {path:"/CheckOut",element:<Root><CheckOut/></Root>},
    {path:"/allorders",element:<Root><Allorders/></Root>},
    {path:"/Checkorder",element:<Root><CheckOrder/></Root>},
    {path:"/ChangePassword",element:<Root><ChangePassword/></Root>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login settoken={settoken}/>},
  ]
}])


  
  return < >
  <div className=' mt-5 pt-2 '>
  <RouterProvider router={router}></RouterProvider>
  <Helmet>
                
                <title>Fresh Cart</title>
                <link rel="icon" href="../src/Components/media/freshcartlogo.svg" />
                <link rel="canonical" href="" />
            </Helmet>
  </div>
  </>
}

export default App;
