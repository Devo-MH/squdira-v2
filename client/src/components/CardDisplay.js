import React from 'react'; // Import React

// This functional component receives a 'card' prop and displays its details
const CardDisplay = ({ card }) => {
  const defaultImage = '/images/default-card-image.jpg';  // Make sure you have this image in your public folder
  const cardImage = card.image || defaultImage;  // Use card image or fallback to default image

  return (
    <div className="card p-4 border rounded-lg shadow-lg transition-transform transform hover:scale-105">
      <img
        src={cardImage}
        alt={card.name}
        className="w-full h-64 object-cover rounded-lg"
        onError={(e) => { e.target.src = defaultImage; }}  // Fallback for broken images
      />
      <h2 className="text-xl font-semibold mt-4">{card.name}</h2>
      <p className="text-gray-600">{card.description || 'No description available'}</p>
    </div>
  );
};

export default CardDisplay;
