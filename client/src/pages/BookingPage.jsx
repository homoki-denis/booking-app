import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);

        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }
  return (
    <div className="my-8">
      <h1 className="text-2xl">{booking.place.title}</h1>
      <a
        target="blank"
        href={`https://maps.google.com/?q=${booking.place.address}`}
        className="font-semibold underline"
      >
        {booking.place.address}
      </a>
      <PlaceGallery place={booking.place} />
      <div className="my-4">
        <h2 className="text-2xl font-bold">Description</h2>
        {booking.place.description}
      </div>

      <div className="my-2">
        <h2 className="text-2xl font-bold">Extra Info</h2>
        {booking.place.extraInfo}
      </div>
    </div>
  );
}

{
}
