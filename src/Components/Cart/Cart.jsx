import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ClearCart, GetCart, RemoveCart, UpdateCart } from '../../Redux/CartSlice'
import Embty from '../media/preview.png'
import { isLoading, unLoading } from '../../Redux/RegisterSlice'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Cart() {
  let Navigate=useNavigate()
  let {Loading}=useSelector((state)=>state.Register)
  let Dispatch=useDispatch()
  const [Data, setData] = useState(null)
  async function GetToCart(){
    Dispatch(isLoading())
    let response=await Dispatch(GetCart())
    console.log(response);
    // eslint-disable-next-line eqeqeq
    if (response.payload?.data?.status=="success" &&response.payload?.data?.numOfCartItems > 0 ) {
      setData(response.payload.data.data)
      
    }else{setData(null)}
    Dispatch(unLoading())
  }
  async function GetToCart1(){
 
    let response=await Dispatch(GetCart())
   
    // eslint-disable-next-line eqeqeq
    if (response.payload?.data?.status=="success" &&response.payload?.data?.numOfCartItems > 0 ) {
      setData(response.payload.data.data)
     
      
    }else{setData(null)}
   
  }
  async function ClearToCart(){
await Dispatch(ClearCart())
GetToCart()}
  async function RemoveinCart(id){
    await Dispatch(RemoveCart(id))
    GetToCart1()
  }
  async function increase(ide,count){
    let countplas = (count += 1);
    let data={count:countplas,id:ide}
    await Dispatch(UpdateCart(data))  
    GetToCart1()
  }
  async function decrease(ide,count){
    let countplas = (count -= 1);
    let data={count:countplas,id:ide}
    let response= await Dispatch(UpdateCart(data)) 
    if (response.meta?.arg?.count<=0) {
      RemoveinCart(ide)
      
    }
    GetToCart1()
  }
  
  useEffect(() => {
  GetToCart()
  
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
        
      <>

  <div className=' container p-0  my-4'>
    <div className=' d-flex justify-content-between '>
      <div><h2 className='mb-3'> Shoping Cart :</h2>
      {Data!=null?<h3 className='h6 text-main mb-4'>Total Price : {Data?.totalCartPrice}</h3>:""}
    </div>
<div >
  
{Data !=null ?<div className=' container text-center '><button onClick={ClearToCart} className='btn btn-outline-danger  w-100 fs-6 fw-bolder '><i className="fa-solid fa-trash-can"></i> Empty The Cart</button></div> : ""}
</div>
    </div>

    
    
  {Data!=null?Data.products.map((product)=><div  key={product.product.id} className="row ">
    <div className="col-4 col-sm-2 mb-1" >
      <img src={product.product.imageCover}  height={150} className=' w-100' alt="" />
    </div>
    <div className="col-sm-10 d-flex justify-content-between">
      
      <div className='col-8'>
      <h4 className='h6 mt-3'>{product.product.title}</h4>
      <h4 className='h6 text-main'>Price :{ product.price}</h4>
      <button onClick={()=>RemoveinCart(product.product.id)} className='btn text-danger p-1 fs-7 '><i className="fa-solid fa-trash-can" ></i> Remove</button>
      </div>
      <div className="col-4 mt-4 ">
        <button className=' btn bg-main   py-0 px-1 rounded-2  text-light fw-bolder ' onClick={()=>increase(product.product.id,product.count)}>+</button>
        <span className='p-2 fw-bolder'>{product.count}</span>
        <button className=' btn bg-main py-0 px-1  rounded-2  text-light fw-bolder ' onClick={()=>decrease(product.product.id,product.count)}>-</button>
      </div>
      
      <div>
     
      </div>
   
    </div>
   

</div>)


: 
  <div className=' vh-100 '>
    <div className='mt-5 text-center' >
      <img src={Embty} height={500} alt="" />
  </div>
  </div>}
  </div>
  

{Data!= null ?  <div className='  container d-flex  justify-content-between'>
      <button onClick={()=>Navigate("/CheckOut")} className=' btn bg-main px-5 text-light '> <i className="fa-solid fa-credit-card"></i>  Credit Card</button>
      <button onClick={()=>Navigate("/Checkorder")} className='btn bg-main px-5 text-light'><i className="fa-solid fa-dollar-sign"></i>  Cash Order</button>


    </div>:""}
  </>} 
  <Helmet>
                <title>Shop Cart</title>
            </Helmet>
  </>
}
