import { useEffect, useState } from 'react';
import axios from 'axios';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then((response) => {
      setPlaces(response.data);
    });
  }, []);
  console.log(places);
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <div key={place._id}>
            <div className="mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl  object-cover aspect-square"
                  src={
                    'http://localhost:4000/uploads/' +
                    place.photos?.[0].replace(/\\/g, '')
                  }
                  alt=""
                />
              )}
            </div>
            <h2 className="text-sm truncate">{place.title}</h2>
            <h3 className="font-bold">{place.address}</h3>
          </div>
        ))}
    </div>
  );
}
