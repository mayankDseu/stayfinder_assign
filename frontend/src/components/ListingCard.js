import React from 'react';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <Link to={`/listing/${listing.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition w-72">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{listing.title}</h3>
          <p className="text-gray-600 text-sm">{listing.location}</p>
          <p className="text-blue-600 font-bold">₹{listing.price}/night</p>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
