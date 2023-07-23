import React from 'react'
import found from '../media/error.svg'

export default function NotFound() {
  return <>
  <div className=' vh-100 text-center'>
    <div className=' position-relative top-50 start-50 translate-middle'>
      <img src={found} alt="" />
    </div>
  </div>
  </>
}
