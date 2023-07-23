import React from 'react'
import MobileStoreButton from 'react-mobile-store-button';

export default function Footer() {
  let android="https://play.google.com/store/games?pli=1"
  const iOSUrl = 'https://itunes.apple.com/us/app/all-of-the-lights/id959389722?mt=8';
  
  return <>
  <div className='Footer mt-3 bg-light'>
<div className="container py-5 ">
  <h2 className='h4'>Get the FreshCart app</h2>
  <p className='h7'>We will send you a link, open it on your phone to download app.</p>
  <div className='p-3 d-flex  border-bottom  fotetal'>
    <input type="email" className=' form-control foterinp' placeholder='Email..' />
    <div className="btn  bg-main text-light w-25 mx-5 p-1 foterbtn"> Share App Link</div>
    <hr />
  </div>
  <div className='d-flex justify-content-between  flex-wrap align-items-center  border-bottom'>
    <div className='d-flex'>
  <h6>Payment Partners</h6> 
<div className='ms-4'>
<i className="fa-brands fa-cc-amazon-pay  fs-3"></i>
<i className="fa-brands fa-cc-amex fs-3"></i>
<i className="fa-brands fa-cc-mastercard fs-3"></i>
<i className="fa-brands fa-cc-paypal fs-3"></i>
</div>
</div>
<div className='d-flex h6  align-items-center google '> 
<h6>Get deliveries FreshCart  </h6>


  <div className='google1 cursor-pointer'>
				<MobileStoreButton
				  store="ios"
          url={iOSUrl}
				  linkProps={{ title: 'iOS Store Button' }}
				/>
			</div>
      <div className='google2 cursor-pointer'>
				<MobileStoreButton
				  store="android"
          url={android}
				  linkProps={{ title: 'android Store Button' }}
				/>
			</div>
   
      </div>
  </div>
</div>
</div>
  </>
}
