// src/components/ProfilePicture.js

import React from 'react';

const ProfilePicture = ({ src, alt }) => {
    return (
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                />
            ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500">
                    <span>No Image</span>
                </div>
            )}
        </div>
    );
};

export default ProfilePicture;
