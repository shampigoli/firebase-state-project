import React, { useEffect, useState } from "react";
import Loader from "../components/loader-img/Loader";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import ListingItem from "../components/listingItems/ListingItem";
import { toast } from "react-toastify";
import { useParams } from "react-router";
const Category = () => {
    const params= useParams()
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchLastListing,setFetchLastListing] =useState(null)
  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible =querySnap.docs[querySnap.docs.length  - 1]
        setFetchLastListing(lastVisible)
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListings(listings);
        console.log(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("could not fetch offers");
      }
    }
    fetchListings();
  }, [params.categoryName]);
  async function fetchMoreListings(){
    try {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(fetchLastListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible =querySnap.docs[querySnap.docs.length  - 1]
      setFetchLastListing(lastVisible)
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings((prevState)=> [...prevState , ...listings]);
      console.log(listings);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("could not fetch offers");
    }
  }
  if(loading){
    return <Loader/>
  }
  return (
    <div>
      <h2 className="text-center text-3xl mt-6 font-bold mb-6">{params.categoryName === "rent" ? "Places for rent" : "Places for Sale"}</h2>
      <div className="max-w-6xl mx-auto">
        <div>
          <ul className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {
              listings && listings.map((listing)=>(
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))
            }
            {!listings && (
              <p>There is no listing</p>
            )}
          </ul>
        </div>
        {
          fetchLastListing && (
            <div className="flex justify-center items-center">
              <button onClick={fetchMoreListings} className="mt-6 bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg capitalize transition ease-in-out duration-150 active:bg-blue-800">Load More</button>
            </div>
          )
        }
        {
          !fetchLastListing && (
            <div className="text-center font-semibold text-xl mt-6">There is no more places for {params.categoryName == "rent" ? "Rent!" : "Sale!"}</div>
          )
        }
      </div>
    </div>
  );
};

export default Category;
