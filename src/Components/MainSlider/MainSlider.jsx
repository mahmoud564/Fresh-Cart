import React from 'react'
import Slider from 'react-slick';

import slider1 from '../media/slider-image-1.jpeg';
import slider2 from '../media/slider-image-2.jpeg';
import slider3 from '../media/slider-image-3.jpeg';
import blog1 from '../media/blog-img-1.jpeg';
import blog2 from '../media/blog-img-2.jpeg';


export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,}

  return <>
  
  <div className=' container-fluid px-4 d-flex' >
  <div className='w-75 my-3' >
  {/* <Slider {...settings}>
                <img src={slider1} alt="" height={400}/>
                <img src={slider2} alt="" height={400}/>
                <img src={slider3} alt="" height={400}/>
              </Slider> */}
              
              <Slider {...settings}>
              <img src={slider1} alt="" height={400}/>
                <img src={slider2} alt="" height={400}/>
                <img src={slider3} alt="" height={400}/>
        
        </Slider>



  </div>
  <div className='w-25 my-3 position-relative '>
    <img src={blog1} className="w-100" alt="" height={200} />
    <img src={blog2} className="w-100" alt=""height={200} />

  </div>


</div>
  
  </>
}
