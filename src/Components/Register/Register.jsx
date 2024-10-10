import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import  { RegisterSliceApi, isLoading, unLoading } from '../../Redux/RegisterSlice';
import { useNavigate } from 'react-router-dom';






export default function Register() {
  let Navigate =useNavigate()
  const [error, seterror] = useState(null)
 let {Loading}= useSelector((state)=>state.Register)
   let Dispatch=useDispatch()
  async function RegisterData(body){
    Dispatch(isLoading())
    let respons=await Dispatch(RegisterSliceApi(body))
    // eslint-disable-next-line eqeqeq
    if(respons.payload.statusMsg=="fail"){
      seterror(respons.payload)
    }else{Navigate("/login")}
    Dispatch(unLoading())
  }
  
  let validationSchema=Yup.object({
    name:Yup.string().required("Name is required").min(4,'Must be 4 characters or More').max(15, 'Must be 15 characters or less'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password:Yup.string().matches(/^[A-Z][\w]{5,20}$/,"password stert letter Captal and password Length 6 to 15").required("Password is required"),
    rePassword:Yup.string().required("RePassword is required").oneOf([Yup.ref("password")]),
    phone:Yup.string().required("phone is Required").matches(/^01[0125][0-9]{8}$/,"phone is valed")
  })

  let formik=useFormik({
    initialValues:{
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },validationSchema,onSubmit:RegisterData
  })
  return <>
  <div className='w-75 m-auto mt-5'>
    <h2>Register Now :</h2>

  {error?<div className='alert alert-danger text-center' > {error.statusMsg}:{error.message} </div>:""}
    <form onSubmit={formik.handleSubmit}>
      <label className='my-2' htmlFor='name'>Name :</label>
      <input type="text" className=' form-control mb-3' id='name' name='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
      {formik.touched.name && formik.errors.name ? (<div className=' alert alert-danger py-2'>{formik.errors.name}</div>) : null}

      <label htmlFor="email" className='mb-2'>email :</label>
      <input type="email" className=' form-control mb-3' name='email' id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
      {formik.touched.email && formik.errors.email ? (<div className=' alert alert-danger py-2'>{formik.errors.email}</div>) : null}

      <label htmlFor="password" className='mb-2'>Password :</label>
      <input type="password" className=' form-control mb-3' name='password' id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
      {formik.touched.password && formik.errors.password ? (<div className=' alert alert-danger py-2'>{formik.errors.password}</div>) : null}


      <label htmlFor="rePassword" className='mb-2'>RePassword :</label>
      <input type="password" className=' form-control mb-3' name='rePassword' id='rePassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} />
      {formik.touched.rePassword && formik.errors.rePassword ? (<div className=' alert alert-danger py-2'>{formik.errors.rePassword}</div>) : null}


      <label htmlFor="phone" className='mb-2'>Phone :</label>
      <input type="tel" className=' form-control mb-3' name='phone' id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
      {formik.touched.phone && formik.errors.phone ? (<div className=' alert alert-danger py-2'>{formik.errors.phone}</div>) : null}

      {Loading !==false?<button className="btn btn-main" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn btn-main">Create Account</button> }
    </form>
  </div>

  
  </>
}
