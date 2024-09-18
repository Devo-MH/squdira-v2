// client/src/components/Profile.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { axiosPrivate } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get('/api/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [axiosPrivate]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <img src={user.avatar || '/default-avatar.png'} alt="Avatar" />
      <h1>{user.username || 'Anonymous'}</h1>
      <p>Wallet Address: {user.walletAddress}</p>
      <h2>Achievements</h2>
      <ul>
        {user.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
      <h2>Game History</h2>
      <ul>
        {user.gameHistory.map((game) => (
          <li key={game._id}>{game.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
