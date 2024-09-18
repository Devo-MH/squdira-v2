// src/components/Friends.js
import React, { useState, useEffect, useContext } from 'react';
//import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Friends = () => {
  const { axiosPrivate } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosPrivate.get('/api/friends');
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, [axiosPrivate]);

  return (
    <div>
      <h1>Your Friends</h1>
      <ul>
        {friends.map((friend) => (
          <li key={friend._id}>{friend.username || friend.walletAddress}</li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
