  import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { isLoading, loginSliceApi, unLoading } from '../../Redux/RegisterSlice'
import { useNavigate } from 'react-router-dom'
import toast, {  } from 'react-hot-toast';


export default function Login({settoken}) {
  let {decoded}=useSelector((state)=>state.Register)
  console.log(decoded);
  let Navigate =useNavigate()
 let{Loading}= useSelector((state)=>state.Register)
  const [error, seterror] = useState(null)
  let Dispatch=useDispatch()
  async function LoginApi(body){
    Dispatch(isLoading())
    let response= await Dispatch(loginSliceApi(body))
if(response.payload?.message==="success"){
  Navigate("/")
  localStorage.setItem("token",response.payload.token)
  settoken( localStorage.getItem("token"))
  toast.success(`Well Come ${decoded.name}`);
}
  else{seterror(response.payload)}
    Dispatch(unLoading())

  }
  let validationSchema=Yup.object({
    email:Yup.string().required("email is required").email("'Invalid email address'"),
    password:Yup.string().matches(/^[A-Z][\w]{5,20}$/,"password stert letter Captal and password Length 6 to 15").required("Password is required")
  })
  let formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },validationSchema,onSubmit:LoginApi
  })

  
  return <>
   <div className='w-75 m-auto mt-5'>
    <h2>LogIn Now :</h2>

    {error?<div className='alert alert-danger text-center' > {error.statusMsg}:{error.message} </div>:""}
    <form onSubmit={formik.handleSubmit}>
  
      <label htmlFor="email" className='my-2'>Email :</label>
      <input type="email" className=' form-control mb-3' name='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
      {formik.touched.email && formik.errors.email ? (<div className=' alert alert-danger py-2'>{formik.errors.email}</div>) : null}

      <label htmlFor="password" className='mb-2'>Password :</label>
      <input type="password" className=' form-control mb-3' name='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
      {formik.touched.password && formik.errors.password ? (<div className=' alert alert-danger py-2'>{formik.errors.password}</div>) : null}

      {Loading!==false?<button className="btn btn-main" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn btn-main">LogIn</button> }
    </form>
    
  </div>
  </>
}
