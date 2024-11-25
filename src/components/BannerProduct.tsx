import  { useEffect, useState } from 'react'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import { bannerType } from '../typescript/HomeType'
import axios from 'axios'
import SummaryApi from '../common'
import { server } from '../common/path'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setLoading } from '../store/PageSlice'


const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [data, setData] = useState<bannerType[]>([])
  const dispatch = useDispatch()
    const nextImage = () =>{
        if(data?.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
  }
    useEffect(() => {
    getBanner()
    },[])

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(data?.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        },3000)

        return ()=> clearInterval(interval)
    }, [currentImage])
  const getBanner = async () => {
    dispatch(setLoading(true))
    
    try {
      const response = await axios.get(SummaryApi.getBanner.url)
      if (response.status === 200) {
        setData(response?.data)
    dispatch(setLoading(false))
        
    }
    }
    catch (err) {
    dispatch(setLoading(false))

      console.error('Failed to get data', err)
    }
  }
  return (
    <div className='container min-h-[32rem] md:h-96 mx-auto px-4 pt-2 rounded '>
      <div className=' w-full h-full bg-slate-200 relative'>
        <div className='absolute  h-full w-full md:flex items-center hidden '>
          <div className=' flex justify-between w-full text-2xl'>
            <button
              onClick={preveImage}
              className={`${data?.length > 1 ? "visible" : "hidden"} z-20 bg-white hover:scale-110 shadow-md rounded-full p-2.5`}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextImage}
              className={`${data?.length > 1 ? "visible" : "hidden"} z-20 bg-white hover:scale-110 shadow-md rounded-full p-2.5`}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/**desktop and tablet version */}
        <div className='z-10 absolute md:flex h-full w-full overflow-hidden'>
          {data.map((banner, index) => {
            return (
              <a
                href={banner?.link_url} // Liên kết trang mới
                className='w-full h-full min-w-full min-h-full transition-all'
                key={index}
                target='_blank' // Mở trong tab mới
                rel='noopener noreferrer' // Tăng cường bảo mật
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={server + banner.image_url} alt='Banner' className='w-full h-full' />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BannerProduct