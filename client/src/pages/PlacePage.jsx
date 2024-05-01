import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../BookingWidget';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return '';

  if (showAllPhotos) {
    return (
      <div className="absolute bg-white min-h-screen">
        <div>
          <button
            onClick={() => setShowAllPhotos(false)}
            className=" py-2 px-4 rounded-2xl bg-black text-white"
          >
            Close Photos
          </button>
        </div>
        <div>
          <h2 className="text-3xl pb-2">Photos of {place.title}</h2>
        </div>
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => (
            <div key={photo} className="w-2/4 pb-2 mx-auto">
              <img src={'http://localhost:4000/uploads' + photo} alt="photo" />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        target="blank"
        href={`https://maps.google.com/?q=${place.address}`}
        className="font-semibold underline"
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr] max-w-xl relative">
        <div>
          {place.photos?.[0] && (
            <div className="aspect-square object-cover ">
              <img
                src={'http://localhost:4000/uploads/' + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid gap-2 ">
          <div className="aspect-square object-cover">
            {place.photos?.[1] && (
              <img
                src={'http://localhost:4000/uploads/' + place.photos[1]}
                alt=""
              />
            )}
          </div>
          <div className="aspect-square object-cover">
            {place.photos?.[2] && (
              <img
                src={'http://localhost:4000/uploads/' + place.photos[2]}
                alt=""
              />
            )}
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-0 right-0 py-2 px-4 bg-white rounded-2xl border border-black"
          >
            Show more
          </button>
        </div>
      </div>
      <div className="my-4">
        <h2 className="text-2xl font-bold">Description</h2>
        {place.description}
      </div>
      <div className="grid grid-cols-2">
        <div>
          Check-in:{place.checkIn} <br />
          Check-out:{place.checkOut} <br />
          Max guests: {place.maxGuests}
        </div>

        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="my-2">
        <h2 className="text-2xl font-bold">Extra Info</h2>
        {place.extraInfo}
      </div>
    </div>
  );
}
