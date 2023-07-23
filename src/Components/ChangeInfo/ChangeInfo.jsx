import { useFormik } from 'formik'
import React, { useState } from 'react'
import *as yup from 'yup'
import { ChangeInfo } from '../../Redux/User'
import { useDispatch, useSelector } from 'react-redux'
import { isLoading, unLoading } from '../../Redux/RegisterSlice'

export default function AddAddress() {
  let {Loading}= useSelector((state)=>state.Register)
  const [error, seterror] = useState(null)
  const [Sucsses, setSucsses] = useState(null)

let Dispatch=useDispatch()
async function Address(values){
  Dispatch(isLoading())
  let response =await Dispatch(ChangeInfo(values))
  if (response.payload?.data?.message==="success") {
    setSucsses("Change Info is Success")
  }else{seterror("Email is already used")}
  Dispatch(unLoading())
  
}
  let validationSchema=yup.object({
    name:yup.string().required("Name is required").min(4,'Must be 4 characters or More').max(15, 'Must be 15 characters or less'),
    email: yup.string().email('Invalid email address').required('Required'),
    phone:yup.string().required("phone is Required").matches(/^01[0125][0-9]{8}$/,"phone is valed"),
  })
  let formik=useFormik({
    initialValues:{
      name: "",
      email: "",
      phone: "",
      
    },validationSchema,onSubmit:Address
  })
  return <>
  <div className='  mt-5'>
    <h2 className='text-center text-main  mt-4 fw-bolder '>Change Your Info :</h2>
    <div className=' w-75 m-auto'>
  <form onSubmit={formik.handleSubmit}>
<label htmlFor="name"> Name :</label>
<input className='form-control mb-3' type="text"  name='name' id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name}/>
{formik.errors.name && formik.touched.name ? <div className='p-2 alert alert-danger'>{formik.errors.name}</div>:""}
<label htmlFor="email"> Email :</label>
<input className='form-control mb-3' type="email"  name='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email}/>
{formik.errors.email && formik.touched.email ? <div className='p-2 alert alert-danger'>{formik.errors.email}</div>:""}
<label htmlFor="phone">  Phone :</label>
<input className='form-control mb-3' type="tel"  name='phone' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone}/>
{formik.errors.phone && formik.touched.phone ? <div className='p-2 alert alert-danger'>{formik.errors.phone}</div>:""}
{Loading !==false?<button className="btn btn-main" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn btn-main">Submit</button> }
  </form>
{Sucsses?<div className='p-2 alert bg-main text-light mt-2 text-center'>{Sucsses}</div>:""}
{error?<div className='p-2 alert alert-danger text-light mt-2 text-center'>{error}</div>:""}
  </div>

  </div>
  
  </>
}
