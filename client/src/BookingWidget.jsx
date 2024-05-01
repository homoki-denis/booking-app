import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-300 p-4 rounded-2xl">
      <div className="text-center">
        Price ${place.price} / night <br />
      </div>
      <div className="my-4 ">
        <label> Check in: </label>
        <input
          type="date"
          value={checkIn}
          onChange={(ev) => setCheckIn(ev.target.value)}
        />
      </div>
      <div className="my-4 ">
        <label> Check out: </label>
        <input
          type="date"
          value={checkOut}
          onChange={(ev) => setCheckOut(ev.target.value)}
        />
      </div>
      <div className="my-4 ">
        <label> Number guests: </label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(ev) => setNumberOfGuests(ev.target.value)}
        />
      </div>

      {numberOfNights > 0 && (
        <div className="my-4 ">
          <label> Your full name: </label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label> Your phone number: </label>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      )}
      <button onClick={bookThisPlace} className="primary">
        Book this place: $
        {numberOfNights > 0 && <span>{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}
