import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return '';

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
      <PlaceGallery place={place} />
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
