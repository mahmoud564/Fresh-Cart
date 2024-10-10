import React, { useEffect, useState } from 'react'
import { CategoriesProduct } from '../../Redux/ApiSlice'
import { useDispatch } from 'react-redux'
import { settings } from '../../Redux/RegisterSlice'
import Slider from 'react-slick';



export default function Slidere() {
  let Dispatch=useDispatch()
  const [api, setapi] = useState(null)
  async function GetCategories(){
    let respones= await Dispatch(CategoriesProduct())
    setapi(respones.payload?.data)    
  }
  useEffect(() => {
   GetCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return <>
 <div className=' container-fluid px-4 overflow-hidden'>
  <h4 className='h5'>Shop Populer Categories</h4>

  <Slider {...settings}>
                {api?.map((e)=><div key={e._id} className="cursor-pointer " >
                  <img className='w-100' height={200} src={e.image} alt="" />
                  <h2 className='h6 text-center'>{e.name}</h2>
                </div>)}
              </Slider>
              </div>
  
  
  </>
}
