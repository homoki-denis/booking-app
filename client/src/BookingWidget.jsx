export default function BookingWidget({ place }) {
  return (
    <div className="bg-gray-300 p-4 rounded-2xl">
      <div className="text-center">
        Price {place.price} / night <br />
      </div>
      <div className="my-4 ">
        <label> Check in: </label>
        <input type="date" />
      </div>
      <div className="my-4 ">
        <label> Check out: </label>
        <input type="date" />
      </div>
      <div className="my-4 ">
        <label> Number guests: </label>
        <input type="number" />
      </div>
      <button className="primary"> Book this place</button>
    </div>
  );
}
