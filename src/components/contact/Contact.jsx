import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { toast } from 'react-toastify'

const Contact = ({userRef, listing}) => {
    const [landlord,setLandlord] =useState(null)
    const [message,setMessage] =useState("")
    useEffect(()=>{
        async function fetchUser(){
            const docRef=  doc(db ,"users" ,userRef)
            const docSnap= await getDoc(docRef)
            if(docSnap.exists()){
                setLandlord(docSnap.data())
            }else{
                toast.error("Could not get landlord data")
            }
        }
        fetchUser()
    },[])
    function onChange(e){
        setMessage(e.target.value)
    }
  return (
    <>
      {landlord !== null && (
        <div>
            <p className='font-semibold m-2'>Contact {landlord.name} for {listing.name.toLowerCase()}</p>
            <div>
                <textarea  id="message" name='message'  rows="2" value={message} placeholder='Enter Message' className='w-[75%] mx-auto border-[1px] border-gray-600 rounded-md p-2 mt-3  duration-150 transition ease-in-out text-gray-500' onChange={onChange}></textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=${listing.name}&body=${message}`}>
                <button className='mb-3 mt-3 w-[75%] bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg uppercase transition ease-in-out duration-150 active:bg-blue-800' type='button'>Send Message</button>
            </a>
        </div>
      )}
    </>
  )
}

export default Contact
