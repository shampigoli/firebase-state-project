import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <>
      <li className="relative bg-white rounded-md shadow-md transition-shadow hover:shadow-xl overflow-hidden items-center justify-between flex flex-col m-[10px] pb-2">
        <Link to={`/category/${listing.type}/${id}`} className="contents">
          <img
            src={listing.imgUrls[0]}
            alt=""
            loading="lazy"
            className="h-[170px] w-full object-cover  hover:scale-105 transition ease-in duration-200"
          />
          <div>
            <div className="flex items-center mt-2">
              <MdLocationOn className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-sm text-gray-600 truncate">
                {listing.address}
              </p>
            </div>
            <p className=" text-lg truncate capitalize font-[600]">
              {listing.name}
            </p>
            <p className="font-[400] text-sm">
              Regular Price : $
              {listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type == "rent" && " / month"}
            </p>
            <p className="text-red-500 font-[600] text-md">
              Dicounted Price : $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type == "rent" && " / month"}
            </p>
            <div>
              <div className="flex space-x-3 text-sm font-bold">
                <p>
                  {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
                </p>
                <p>
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Beds`
                    : "1 Bath"}
                </p>
              </div>
                          </div>
          </div>
        </Link>
        <div className="flex items-center cursor-pointer absolute bottom-2 right-3 text-md space-x-1">
                {onEdit && (
                  <MdEdit
                    className="text-cyan-400"
                    onClick={() => onEdit(listing.id)}
                  />
                )}
                {onDelete && (
                  <FaTrash
                    className="text-red-600 "
                    onClick={() => onDelete(listing.id)}
                  />
                )}
              </div>

      </li>
    </>
  );
};

export default ListingItem;
