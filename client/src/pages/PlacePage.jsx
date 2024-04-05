import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  console.log(place);
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
      <div className="grid gap-2 grid-cols-[2fr_1fr] max-w-xl">
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
        <div className="grid gap-2">
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
        </div>
      </div>
    </div>
  );
}
