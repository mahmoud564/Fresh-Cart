import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Products } from '../../Redux/ApiSlice'
import { Link } from 'react-router-dom'
import { isLoading, unLoading } from '../../Redux/RegisterSlice'
import { AddCart, GetCart, isLoadingCart, unLoadingCart } from '../../Redux/CartSlice'
import toast, { Toaster } from 'react-hot-toast';
export default function FitshProduct() {  
  let {Loading}=useSelector((state)=>state.Register)
  let {LoadingCart}=useSelector((state)=>state.Cart)
  let Despatch=useDispatch()
  const [api, setapi] = useState(null)
  const [data, setdata] = useState(null)
  const [values, setvalues] = useState(null)
  async function GetProducts(){
    Despatch(isLoading())
    let response=await Despatch(Products())
    setapi(response.payload.data)
    Despatch(unLoading ())}
   async function AddtoCart(id){
      Despatch(isLoadingCart())
      let response = await Despatch(AddCart(id))
      if (response.payload?.data?.status==="success") {
         toast.success(response.payload?.data?.message);
         Despatch(GetCart())}Despatch(unLoadingCart ())}
         function Search(event){
      if (event.target.value.length >0) {
        setdata(api.filter((e)=> e.title.toLowerCase().includes(event.target.value.toLowerCase()) ))
      }else{setdata(api)}}
     function All(){
      setdata(api)
     }
     function Men(){
      setdata(api.filter((e)=> e.category.name==="Men's Fashion"))
     }
     function Women(){
      setdata(api.filter((e)=> e.category.name==="Women's Fashion"))
     }
     function elacterc(){
      setdata(api.filter((e)=> e.category.name==="Electronics"))
     }
  useEffect(() => {
    GetProducts()
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
      <Toaster/>
      }
  <div className=' mt-5  '>
      <div className=' w-75 m-auto mb-3'>
      <form className="d-flex" role="search">
  <input value={values} onChange={Search} className="form-control w-100 me-2" type="search" placeholder="Search" aria-label="Search" />
</form>
      </div>
      <div  className=' text-center '>  
        <li className="nav-item dropdown  border-1 border p-2 w-75 m-auto rounded-2   text-main fw-bolder">
      <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Categorys <span>   </span>
   </a>
  <ul className="dropdown-menu w-100 bg-transparent text-center ">
  <li><a className="dropdown-item w-100  border-1 border p-2 w-75 m-auto rounded-2   text-main fw-bolder"onClick={All} >All</a></li>
    <li><a className="dropdown-item w-100  border-1 border p-2 w-75 m-auto rounded-2   text-main fw-bolder"  onClick={Men}>Men Fashion</a></li>
    <li><a className="dropdown-item  w-100 border-1 border p-2 w-75 m-auto rounded-2   text-main fw-bolder" onClick={Women} >Women Fashion</a></li>
    <li><a className="dropdown-item  w-100 border-1 border p-2 w-75 m-auto rounded-2   text-main fw-bolder"  onClick={elacterc}>Electronics</a></li>
  </ul>
</li>
</div>
    </div>
  <div className='container-fluid px-4'>
    
    <div className="row tab-content  ">
    {data?data.map((e)=><div key={e.id} className='g-4 cardPrdact col-lg-2 col-md-3 col-sm-4 col-6 overflow-hidden position-relative ' >
      <Link  to={`/ProductDetails/${e.id}`}>
      <img src={e.imageCover} className="card-img-top  rounded-2" alt="" height={250} />
      <div className='  mb-4'>
        <h3 className=' fs-7 mt-2 text-main'>{e.category.name}</h3>
        <h3 className=' fs-6 text-center '>{e.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className="d-flex   justify-content-around ">
                  {" "}
                  <p className="">{e.price} EGP</p>
                  <p className=" ">
                    {" "}
                    <i className="fa-solid fa-star rating-color"></i>{" "}
                    {e.ratingsAverage}
                  </p>
                </div>   
      </div>
      </Link>
      {LoadingCart !==false?<button className="btn btn-main text-center w-100 bg-main btn-transform" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       
      </button>:<button className='btn btn-success w-100 h2 bg-main btn-transform ' onClick={()=>AddtoCart(e.id)}>+  Add TO Cart</button>}
      
      </div>
      )
    :
    api?.map((e)=><div key={e.id} className='g-4 cardPrdact col-lg-2 col-md-3 col-sm-4 col-6 overflow-hidden position-relative ' >
      <Link  to={`ProductDetails/${e.id}`}>
      <img src={e.imageCover} className="card-img-top  rounded-2" alt="" height={250} />
      <div className='  mb-4'>
        <h3 className=' fs-7 mt-2 text-main'>{e.category.name}</h3>
        <h3 className=' fs-6 text-center '>{e.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className="d-flex   justify-content-around ">
                  {" "}
                  <p className="">{e.price} EGP</p>
                  <p className=" ">
                    {" "}
                    <i className="fa-solid fa-star rating-color"></i>{" "}
                    {e.ratingsAverage}
                  </p>
                </div>   
      </div>
      </Link>
      {LoadingCart !==false?<button className="btn btn-main text-center w-100 bg-main btn-transform" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       
      </button>:<button className='btn btn-success w-100 h2 bg-main btn-transform ' onClick={()=>AddtoCart(e.id)}>+  Add TO Cart</button>}
      
      </div>
      )}

    </div>
  </div>
  <Toaster/>
  
  
  
  </>
}
