import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AccountPage() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }

  const logout = async () => {
    await axios.post('/logout');
  };

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const linkedClasses = (type = null) => {
    let classes = 'py-2 px-4';

    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full';
    }
    return classes;
  };

  // bg-primary text-white rounded-full
  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={linkedClasses('profile')} to={'/account'}>
          My profile
        </Link>
        <Link className={linkedClasses('bookings')} to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className={linkedClasses('places')} to={'/account/places'}>
          My accommodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-4">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm !mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
