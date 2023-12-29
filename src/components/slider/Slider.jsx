import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import Loader from '../loader-img/Loader'
import {Swiper ,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css/bundle'
import { useNavigate } from 'react-router'
const Slider = () => {
    const [listings,setListings] =useState(null)
    const [loading,setLoading] =useState(true)
    const navigate= useNavigate()
    SwiperCore.use([Pagination,Navigation])

    useEffect(()=>{
        async function fetchListings(){
            const listingsRef= collection(db, "listings")
            const q =query(listingsRef , orderBy("timestamp" , "desc"), limit(5))
            const querySnap= await getDocs(q)
            let listings= [];
            querySnap.forEach((doc)=>{
                return listings.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
            setListings(listings)
            setLoading(false)
        }
        fetchListings()
    },[])
    if(loading){
      return <Loader/>
    }
    // if(listings.length=== 0){
    //   return <>
        
    //   </>
    // }
  return (
    listings && 
    <>
      <Swiper slidesPerView={1} navigation pagination={{type:"progressbar"}} modules={[EffectFade]} effect='fade' autoplay={{delay:3000}}>
      {
        listings.map(({data,id})=>(
        <SwiperSlide key={id} onClick={()=>navigate(`/category/${data.type}/${id}`)} >
        <figure  className='relative w-full  h-[300px] '>
            <img src={data.imgUrls[0]} alt="" className='w-full h-full'/>
        </figure>
        <p className='absolute text-white top-5 bg-cyan-600 p-2  rounded-tr-3xl left-2 capitalize shadow-lg opacity-70'>{data.name}</p>
        <p className='absolute text-white bottom-5 bg-red-600 p-2 rounded-br-3xl rounded-tl-xl left-2 capitalize shadow-lg opacity-90'>${data.offer ? data.discountedPrice : data.regularPrice}
        {data.type == "rent" && " / month"}
        </p>
        </SwiperSlide>
        ))
      }
      </Swiper>
    </>
  )
}

export default Slider
