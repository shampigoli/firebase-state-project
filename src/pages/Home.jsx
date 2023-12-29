import { useEffect, useState } from 'react'
import Slider from '../components/slider/Slider'
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { Link } from 'react-router-dom'
import ListingItem from '../components/listingItems/ListingItem'
const Home = () => {
  const [offerListings,setOfferListings] =useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingsRef=collection(db, "listings")
        const q=query(listingsRef , where("offer" ,"==" , true),orderBy("timestamp" ,"desc"), limit(4))
        const querySnap = await getDocs(q);
        const listings= [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setOfferListings(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  },[])
  // places for rent
  const [rentListings,setRentListings] =useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingsRef=collection(db, "listings")
        const q=query(listingsRef , where("type" ,"==" , "rent"),orderBy("timestamp" ,"desc"), limit(4))
        const querySnap = await getDocs(q);
        const listings= [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setRentListings(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  },[])
  //places for sale
  const [saleListings,setSaleListings] =useState(null)
  useEffect(()=>{
    async function fetchListings(){
      try {
        const listingsRef=collection(db, "listings")
        const q=query(listingsRef , where("type" ,"==" , "sale"),orderBy("timestamp" ,"desc"), limit(4))
        const querySnap = await getDocs(q);
        const listings= [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id:doc.id,
            data:doc.data()
          })
        })
        setSaleListings(listings)
      } catch (error) {
        console.log(error)
      }
    }
    fetchListings()
  },[])
  return (
    <>
     <Slider/> 
     {offerListings && (
      <div className='max-w-6xl mx-auto space-y-6 mt-6'>
        <h2 className='font-semibold text-3xl'>Recent Offers</h2>
        <Link to='/offers' className='text-sm ml-8 text-blue-600 transition ease-in-out duration-200 hover:text-blue-700'>
          Show More Offers
        </Link>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {offerListings.map((listing)=>(
            <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
          ))}
        </ul>
      </div>
     )}
     {rentListings && (
      <div className='max-w-6xl mx-auto space-y-6 mt-6'>
        <h2 className='font-semibold text-3xl'>Places for Rent</h2>
        <Link to='/category/rent' className='text-sm ml-[15px] text-blue-600 transition ease-in-out duration-200 hover:text-blue-700'>
          Show More Places for Rent
        </Link>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {rentListings.map((listing)=>(
            <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
          ))}
        </ul>
      </div>
     )}
     {saleListings && (
      <div className='max-w-6xl mx-auto space-y-6 mt-6'>
        <h2 className='font-semibold text-3xl'>Places for Sale</h2>
        <Link to='/category/sale' className='text-sm ml-[15px] text-blue-600 transition ease-in-out duration-200 hover:text-blue-700'>
          Show More Places for Sale
        </Link>
        <ul className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
          {saleListings.map((listing)=>(
            <ListingItem key={listing.id} listing={listing.data} id={listing.id}/>
          ))}
        </ul>
      </div>
     )}
    </>
  )
}

export default Home
