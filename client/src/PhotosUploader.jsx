import { useState } from 'react';
import axios from 'axios';

export default function PhotosUploader({ photos, onChange }) {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoByLink = async (ev) => {
    ev.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  };

  const uploadPhoto = (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;

        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <>
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
      <div className="grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
        {photos.length > 0 &&
          photos.map((link) => (
            <div className="h-38 flex" key={link}>
              <img
                className=" rounded-2xl"
                src={'http://localhost:4000/uploads/' + link}
                alt=""
              />
            </div>
          ))}
        <label className="flex justify-center border bg-transparent rounded-2xl p-16 text-2xl">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
        </label>
      </div>
    </>
  );
}
