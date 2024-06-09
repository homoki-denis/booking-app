import { useEffect, useState } from 'react';
import axios from 'axios';
import AccountNav from '../AccountNav';
import PlaceImg from '../PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then((response) => {
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 mb-2"
              key={booking.name}
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="">
                <h2 className="text-2xl">{booking.place.title}</h2>
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')} ->
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                <div>
                  Number of Nights:{' '}
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn),
                  )}{' '}
                  <br />
                  Total price: ${booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
