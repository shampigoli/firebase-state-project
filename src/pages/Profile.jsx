import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import ListingItem from "../components/listingItems/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  function LoggedOut() {
    auth.signOut();
    window.location.replace("/sign-in");
  }
  const { name, email } = formData;
  const [changeDetails, setChangeDetails] = useState(false);
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName == !name) {
        //update the user name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update the name in the firebase
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile Updated Successfully!");
    } catch (error) {
      toast.error("Could not update the profile");
    }
  };
  useEffect(() => {
    async function fetchUserListings() {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
 async function onDelete(listingID){
    if(window.confirm("Are you sure to delete this listing?")){
      await deleteDoc(doc(db, "listings" , listingID))
      const updatedListings=listings.filter((listing)=>listing.id !== listingID)
      setListings(updatedListings)
      toast.success("Listing is deleted successfully!")
    }
  }
  function onEdit(listingID){
    navigate(`/edit-listing/${listingID}`)
  }
  return (
    <>
      <section className="max-w-6xl mx-auto mt-6 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mt-6 text-center">My Profile</h1>
        <div className="w-full px-3 md:w-[50%] mt-6">
          <form>
            {/* name input */}
            <input
              type="text"
              value={name}
              id="name"
              disabled={!changeDetails}
              onChange={onChange}
              className={`text-gray-700 rounded w-full bg-white transition ease-in-out text-xl px-4 py-2 border mb-6 ${
                changeDetails && "bg-red-200"
              }`}
            />
            {/* email input */}
            <input
              type="email"
              value={email}
              id="email"
              disabled
              className="text-gray-700 rounded w-full bg-white transition ease-in-out text-xl px-4 py-2 border mb-6"
            />
            <div className="flex justify-between whitespace-nowrap text-sm lg:text-lg md:text-md mb-6">
              <p>
                Do you want to change the name?{" "}
                <span
                  onClick={() => {
                    changeDetails && onSubmit();
                    setChangeDetails((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"
                >
                  {changeDetails ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={LoggedOut}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-150 cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            type="submit"
            className="mb-6 w-full bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg uppercase transition ease-in-out duration-150 active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="text-3xl  bg-red-300 rounded-full mr-2 p-1" />
              Sell or Rent your Home
            </Link>
          </button>
        </div>
      </section>
      <div className="mt-6 max-w-6xl mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-center text-3xl font-semibold">My Listings</h2>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-6 mt-6">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
