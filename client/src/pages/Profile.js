// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../services/UserService';
import ProfilePicture from '../components/ProfilePicture';

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/wallet-connect');
      }
    };
    fetchUserProfile();
  }, [navigate]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <ProfilePicture src={user.profilePicture} alt="Profile Picture" />
        <div className="md:ml-6 mt-6 md:mt-0">
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-gray-600">{user.bio}</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Connected Wallets</h3>
            {user.connectedWallets && user.connectedWallets.length > 0 ? (
              <ul className="list-disc ml-6 mt-2">
                {user.connectedWallets.map((wallet, index) => (
                  <li key={index}>{wallet}</li>
                ))}
              </ul>
            ) : (
              <p>No connected wallets</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
