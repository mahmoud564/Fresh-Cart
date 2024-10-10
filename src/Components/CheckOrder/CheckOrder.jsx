import { useFormik } from 'formik'
import React from 'react'
import *as yup from 'yup'
import { CashOrder2 } from '../../Redux/User'
import { useDispatch, useSelector } from 'react-redux'
import { GetCart } from '../../Redux/CartSlice'
import { isLoading, unLoading } from '../../Redux/RegisterSlice'
import { useNavigate } from 'react-router-dom'


export default function CheckOrder() {
 let Navigate=useNavigate()
 let {Loading}= useSelector((state)=>state.Register)
let Dispatch=useDispatch()
async function Check(values){
  Dispatch(isLoading())
  let cartid =await Dispatch(GetCart()) 
  if (cartid.payload?.data?.status=="success") {
    let response =await Dispatch(CashOrder2(cartid.payload.data.data._id,values))
console.log(response);
Dispatch(GetCart())
Navigate("/allorders")
  }else{console.log(cartid);}
  Dispatch(unLoading())
}
  let validationSchema=yup.object({
    Details:yup.string().required("Details is required"),
    phone:yup.string().required("Phone is Required").matches(/^01[0125][0-9]{8}$/,"phone is valed"),
    city:yup.string().required("City is Required"),
  })
  let formik=useFormik({
    initialValues:{
      Details: "",
      phone: "",
      city:""
    },validationSchema,onSubmit:Check
  })
  return <>
  <div className='  mt-5'>
    <h2 className='text-center text-main  mt-4 fw-bolder '>Add Your Address  :</h2>
    <div className=' w-75 m-auto'>
  <form onSubmit={formik.handleSubmit}>
<label htmlFor="Details"> Details :</label>
<input className='form-control mb-3' type="text"  name='Details' id='Details' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.Details}/>
{formik.errors.name && formik.touched.name ? <div className='p-2 alert alert-danger'>{formik.errors.name}</div>:""}

<label htmlFor="phone">  Phone :</label>
<input className='form-control mb-3' type="tel"  name='phone' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
{formik.errors.phone && formik.touched.phone ? <div className='p-2 alert alert-danger'>{formik.errors.phone}</div>:""}

<label htmlFor="city"> city :</label>
<input className='form-control mb-3' type="text"  name='city' id='city' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city}/>
{formik.errors.city && formik.touched.city ? <div className='p-2 alert alert-danger'>{formik.errors.city}</div>:""}
{Loading !==false?<button className="btn btn-main w-100" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn btn-main w-100"><i className="fa-solid fa-dollar-sign"></i> Pay on Cash</button> }
  </form>

  </div>

  </div>
  
  </>
}
