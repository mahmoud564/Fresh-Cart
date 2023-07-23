/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { ProductsDetails } from '../../Redux/ApiSlice';
import Slider from 'react-slick';
import { isLoading, unLoading } from '../../Redux/RegisterSlice';
import { AddCart, GetCart, isLoadingCart, unLoadingCart } from '../../Redux/CartSlice'
import toast, { Toaster } from 'react-hot-toast';



export default function ProductDetails() {
  let {LoadingCart}=useSelector((state)=>state.Cart)
  async function AddtoCart(param){
    Despatch(isLoadingCart())
    let response = await Despatch(AddCart(param))
    if (response.payload?.data?.status==="success") {
       toast.success(response.payload?.data?.message);
       Despatch(GetCart())

    }
    Despatch(unLoadingCart ())
   }
  let settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  }
  let {Loading}=useSelector((state)=>state.Register)
  let param=useParams()
  let Despatch=useDispatch()
const [Data, setData] = useState(null)
  async function GetDetails(param){
    Despatch(isLoading())
    let response=await Despatch (ProductsDetails(param))
    setData(response.payload.data)
    Despatch(unLoading ())
  }
  useEffect(() => {
  GetDetails(param.id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return <>
  {Loading ===true?
        <div className="lay">
          {" "}
          <div className=' position-absolute start-50 top-50 translate-middle'>
          <div className="lds-default ">
  <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>{" "}</div></div> 
      : 
        ""
      }
  {
    Data?<div className=' container ' >
      <div className="row my-5">
        <div className="col-md-4">
        <Slider {...settings}>
        {Data.images.map((image,i)=><img key={i} src={image}></img>)}
        </Slider>
        </div>
        <div className="col-md-8 text-center">
          <h2>{Data.brand.name}</h2>
          <h4>{Data.category.name}</h4>
          <h3 className='h5 my-2' > {Data.title}</h3>
          <h6>{Data.description}</h6>
          <div className="d-flex   justify-content-around ">
                  {" "}
                  <p className="">{Data.price} EGP</p>
                  <p className=" ">
                    {" "}
                    <i className="fa-solid fa-star rating-color"></i>{" "}
                    {Data.ratingsAverage}
                  </p>
                  
                </div>   
                
                {LoadingCart !==false?
                <button className="btn btn-main text-center w-100 bg-main " type="button" disabled>
                  <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span></button>
                  :<button className='btn btn-success w-100 h2 bg-main ' onClick={()=>AddtoCart(param.id)}>+  Add TO Cart</button>}
      
      </div>
        </div>
      </div>
    :""
  }
  <Toaster/>
  
  </>
}
