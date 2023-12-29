import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/loader-img/Loader";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FaParking, FaShare } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaBed, FaBath, FaChair } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { getAuth } from "firebase/auth";
import Contact from "../components/contact/Contact";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Listing = () => {
    const [contactLandlord,setContactLandlord]=useState(false)
  const params = useParams();
  const auth=getAuth();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharedLinkCopied, setShareLinkCopied] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchListing();
    console.log(listing);
  }, [params.listingId]);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <main>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listing.imgUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  background: `url(${listing.imgUrls[index]}) no-repeat center `,
                  backgroundSize: "cover",
                }}
                className=" relative w-full overflow-hidden h-[300px]"
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="absolute top-[100px] z-50 right-[50px] px-3 py-3 rounded-full bg-opacity-35 hover:bg-opacity-80  cursor-pointer bg-white text-slate-600 hover:text-slate-800"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 2000);
          }}
        >
          <FaShare size={20} />
        </div>
        {sharedLinkCopied && (
          <p className="absolute top-[160px] z-50 right-[20px] px-3 py-3 rounded-full cursor-pointer bg-white ">
            Link Copied!
          </p>
        )}
        <div className="flex flex-col md:flex-row max-w-6xl m-4 rounded-lg shadow-lg lg:space-x-5 bg-white  lg:mx-auto text-center">
          {/* for content */}
          <div className="w-full p-3">
            <p className="truncate text-2xl font-bold text-red-500 text-center p-2">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" ? "/ month" : ""}
            </p>
            <p className="flex items-center justify-center font-semibold text-lg mb-3">
              <MdLocationPin className="text-green-600 mr-2 " />
              {listing.address}
            </p>
            <div className="flex items-center space-x-4 justify-center">
              <p className="bg-red-700 text-white p-2 shadow-md hover:shadow-lg tracking-[.5px] w-[150px] rounded-lg cursor-pointer">
                For {listing.type == "rent" ? "Rent" : "Sale"}
              </p>
              <p >
                {listing.offer && (
                  <p className="bg-green-700 text-white p-2 w-[150px] tracking-[2px] rounded-lg cursor-pointer shadow-md hover:shadow-lg">${+listing.regularPrice - +listing.discountedPrice}</p>
                )}
              </p>
            </div>
            <p className="mt-3 mb-3">
              {" "}
              <span className="font-semibold md:text-2xl text-xl">
                Description -
              </span>{" "}
              <span className="text-sm mb-4">{listing.description}</span>
            </p>
            <ul className="flex md:space-x-10 space-x-2 font-semibold justify-center">
              <li className="text-md flex gap-1 whitespace-nowrap items-center">
                <FaBed className="text-lg" />{" "}
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
              </li>
              <li className="text-md flex gap-1 whitespace-nowrap items-center">
                <FaBath className="text-lg" />{" "}
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bed"}
              </li>
              <li className="text-md flex gap-1 whitespace-nowrap items-center">
                <LuParkingCircle  className="text-lg" />{listing.parking ? "Parking Spot" : "No Parking"}
              </li>
              <li className="text-md flex gap-1 whitespace-nowrap items-center">
                <FaChair   className="text-lg" />{listing.furnished ? "Fully Furnished" : "Not Furnished"}
              </li>
            </ul>
            {listing.userRef !== auth.currentUser?.uid && !contactLandlord &&(
            <div className="mt-6">
            <button onClick={()=>setContactLandlord(true)} className="mb-6 w-[70%] bg-blue-600 text-white text-md p-3 rounded border-none outline-none hover:bg-blue-700 shadow-md hover:shadow-lg uppercase transition ease-in-out duration-150 active:bg-blue-800">Contact Landlord</button>
            </div>
            )}
            {
                contactLandlord && <Contact userRef={listing.userRef} listing={listing}/>
            }
          </div>
          {/* map */}
          <div className="overflow-x-hidden z-10 w-full">
          <MapContainer center={[listing.geolocation.lat,listing.geolocation.lng]} zoom={13} scrollWheelZoom={false} style={{width:"100%",height:"100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[listing.geolocation.lat,listing.geolocation.lng]}>
      <Popup>
      {listing.address}
      </Popup>
    </Marker>
  </MapContainer>
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29935376.792065468!2d27.307124670051262!3d23.668060626891254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f8fd751f%3A0x46b7a1f7e614925c!2sPakistan!5e0!3m2!1sen!2s!4v1703845714962!5m2!1sen!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" className="h-[250px] md:h-[400px] p-3 w-full"></iframe>
          </div>
        </div>
      </main>
    </>
  );
};

export default Listing;
