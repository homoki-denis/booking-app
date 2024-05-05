import { useState } from 'react';

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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
  );
}
