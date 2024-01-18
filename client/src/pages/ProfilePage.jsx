import axios from 'axios';

import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Navigate, Link, useParams } from 'react-router-dom';

import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function ProfilePage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  const logout = async () => {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  };

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto mt-4">
          Logged in as {user.name} ({user.email}) <br />
          <button onClick={logout} className="primary max-w-sm !mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
}
