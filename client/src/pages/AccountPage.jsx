import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link } from 'react-router-dom';

export default function AccountPage() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link
          className="py-2 px-4 bg-primary text-white rounded-full"
          to={'/account'}
        >
          My profile
        </Link>
        <Link className="py-2 px-4" to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className="py-2 px-4" to={'/account/places'}>
          My accommodations
        </Link>
      </nav>
    </div>
  );
}
