import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { ChangePasswordUser } from '../../Redux/User'
import { useDispatch, useSelector } from 'react-redux'
import { isLoading, unLoading } from '../../Redux/RegisterSlice'
import { useNavigate } from 'react-router-dom'




export default function ChangePassword() {
  let Navigate=useNavigate()
  let {Loading}= useSelector((state)=>state.Register)
  const [error, seterror] = useState(null)
  const [Sucsses, setSucsses] = useState(null)
  let Dispatch=useDispatch()
  async function changePassword (data){
    Dispatch(isLoading())
    let response=await Dispatch(ChangePasswordUser(data))
    if (response.payload?.data?.message==="success") {
      setSucsses("Change Password is Success")
      localStorage.removeItem("token")
      Navigate("login")
    }else{seterror("Password is wrong")}
    Dispatch(unLoading())
  }
  let validationSchema=yup.object({
    currentPassword:yup.string().matches(/^[A-Z][\w]{5,20}$/,"password stert letter Captal and password Length 6 to 15").required("Password is required"),
    password:yup.string().matches(/^[A-Z][\w]{5,20}$/,"password stert letter Captal and password Length 6 to 15").required("Password is required"),
    rePassword:yup.string().required("RePassword is required").oneOf([yup.ref("password")])
  })
  let formik=useFormik({
    initialValues:{
      currentPassword:"",
      password:"",
      rePassword:""},validationSchema,onSubmit:changePassword
    })

  return <>
  <h2 className=' text-center text-main fa-bold mt-4 fw-bolder'> Change Your Password : </h2>
  <div className=' w-75 m-auto'>
  <form onSubmit={formik.handleSubmit}>
     <input type="password" placeholder=' Enter Your Password' className=' form-control mt-4 mb-1' name='currentPassword' id='currentPassword' onBlur={formik.handleBlur}  onChange={formik.handleChange } value={formik.values.currentPassword}/>
     {formik.errors.currentPassword && formik.touched.currentPassword ? <div className='p-2 alert alert-danger'>{formik.errors.currentPassword}</div>:""}
    <input type="password" placeholder=' Enter New Password' className=' form-control mt-4 mb-1' name='password' id='password' onBlur={formik.handleBlur}  onChange={formik.handleChange } value={formik.values.password} />
    {formik.errors.password && formik.touched.password ? <div className='p-2 alert alert-danger'>{formik.errors.password}</div>:""}
    <input type="password" name='rePassword' id='rePassword' placeholder=' Enter rePassword' className=' form-control mt-4 mb-4' onBlur={formik.handleBlur}  onChange={formik.handleChange } value={formik.values.rePassword}/>
    {formik.errors.rePassword && formik.touched.rePassword ? <div className='p-2 alert alert-danger'>{formik.errors.rePassword}</div>:""}
    {Loading !==false?<button className="btn btn-main" type="button" disabled>
      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
       Loading...
      </button>:
      <button disabled={!(formik.isValid &&formik.dirty)} type="submit" className="btn btn-main">Change Password</button> }

</form>
{Sucsses?<div className='p-2 alert bg-main text-light mt-2 text-center'>{Sucsses}</div>:""}
{error?<div className='p-2 alert alert-danger text-light mt-2 text-center'>{error}</div>:""}
  </div>
  
  </>
}
