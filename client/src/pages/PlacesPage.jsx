import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Perks from '../Perks';

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    setPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  };

  console.log(photos);

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
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
            <h2 className="text-xl mt-4">Photos</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add with a link"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />

              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 px-4 rounded-2xl"
              >
                Add&nbsp;Photo
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
              {photos.length > 0 &&
                photos.map((link) => <div key={link}>{link}</div>)}
              <button className="flex justify-center border bg-transparent rounded-2xl p-16 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </button>
            </div>
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
            <div>
              <button className="primary !my-8">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
