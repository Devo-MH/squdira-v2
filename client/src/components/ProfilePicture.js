// src/components/ProfilePicture.js
import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ src, alt }) => {
  const defaultImage = '/images/default-profile-picture.jpg';

  return (
    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />
      ) : (
        <img
          src={defaultImage}
          alt="Default Profile"
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};

ProfilePicture.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

ProfilePicture.defaultProps = {
  alt: 'Profile Picture',
};

export default ProfilePicture;
