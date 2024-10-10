/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../media/freshcartlogo.svg'
import { useSelector } from 'react-redux'
import $ from 'jquery'
export default function Navbar({token,settoken}) {
  $(".lie").click(function (e) {
    $(".lie").removeClass("Active");
    e.target.classList.add("Active")})
 
  

  
 
  let {CartNumber}=useSelector((state)=>state.Cart)
let Navigate=useNavigate()
function removetoken(){
  settoken(null)
  Navigate("/login")
  localStorage.removeItem("token")
}
  return <>
<nav className="navbar navbar-expand-lg  bg-light fixed-top">
  <div className="container-fluid p-0">
    <img  src={logo} className='  m-0 logo' />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token?   <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
        <li className="nav-item">
          <Link className="nav-link Active lie " >Home</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link lie" to={"/product"} >Products</Link>
        </li> 
        <li className="nav-item ">
          <Link className="nav-link lie" to={"/cart"} >Your Order</Link>
        </li>  
      </ul>:""}
      <ul  className="navbar-nav m-auto mb-2 mb-lg-0 ">
      <li className='me-3 mt-2  cursor-pointer'>
      <i className="fa-brands fa-tiktok mx-2"></i>
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-linkedin mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
        </li>
        {token?
        <>
       <li className="nav-item dropdown">
         <Link className="nav-link dropdown-toggle text-main" id="navbarDropdown" role="button" data-bs-toggle="dropdown" 
         aria-expanded="false">
         <i className="fa-solid fa-user text-main"></i></Link>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item"to={"/AddAddress"} >Change Info</Link></li>
            <li><Link className="dropdown-item"to={"/ChangePassword"}>Change Password   </Link></li>
            <li className="nav-item ">
             <span className=" dropdown-item cursor-pointer" onClick={removetoken}>  LogOut</span>
           </li>  
          </ul>
</li>
      

    <li className="nav-item">
          <Link className="nav-link text-main fw-bolder position-relative  fs-5" to={"/cart"} ><i
           className="fa-solid fa-cart-shopping"></i> <span className='span text-light border border-1 bg-main fs-7 rounded-circle'>
            {CartNumber}</span></Link>
        </li> 
 
 
        </>
            
        :<>
        
        <li className="nav-item ">
          <Link className="nav-link " to={"/login"} >LogIn</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to={"/register"}>Rergister</Link>
        </li>
        </>}
 
     
     
      </ul>
    </div>
  </div>
</nav>

  </>
}
