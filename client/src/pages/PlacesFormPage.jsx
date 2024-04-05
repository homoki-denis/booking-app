import { useState, useEffect } from 'react';
import axios from 'axios';

import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import { Navigate, useParams } from 'react-router-dom';

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setGuests(data.guests);
      setPrice(data.price);
    });
  }, [id]);

  const savePlace = async (ev) => {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      guests,
      price,
    };

    if (id) {
      await axios.put('/places', {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          <h2 className="text-xl mt-4">Title</h2>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="Title, ex: My appartment"
          />
          <h2 className="text-xl mt-4">Address</h2>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <PhotosUploader photos={photos} onChange={setPhotos} />
          <h2 className="text-xl mt-4">Description</h2>
          <textarea
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <h2 className="text-xl mt-4">Perks</h2>
          <Perks selected={perks} onChange={setPerks} />
          <h2 className="text-xl mt-4">Extra info</h2>
          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          <h2 className="text-xl mt-4">Check in&out times</h2>
          <div className="grid sm:grid-cols-3 gap-2">
            <div className="mt-2 -mb-1">
              <h3>Check in Time</h3>
              <input
                type="text"
                placeholder="15:00"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Check out Time</h3>
              <input
                type="text"
                placeholder="21:00"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div className="mt-2 -mb-1">
              <h3>Max guests</h3>
              <input
                type="number"
                placeholder="1"
                value={guests}
                onChange={(ev) => setGuests(ev.value)}
              />
            </div>
          </div>
          <div className="mt-2 -mb-1">
            <h3>Price per night</h3>
            <input
              type="number"
              placeholder="1"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div>
            <button className="primary !my-8">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
