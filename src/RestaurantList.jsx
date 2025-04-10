import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css'; // Import your CSS file

function RestaurantList() {

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      imageUrl: '/images/cheese_burger.jpg',
      name: 'Känttylä',
      averageRating: 4.5,
      reviewCount: 4,
      cuisine: 'Italian',
      priceRange: '$$',
      address: 'Jokiväylä 11, 96300 ROVANIEMI'
    },
    {
        id: 2,
        imageUrl: '/images/cheese_burger.jpg',
        name: 'Känttylä 2',
        averageRating: 5,
        reviewCount: 4,
        cuisine: 'Italian',
        priceRange: '$$',
        address: 'Kansankatu 3'
      }
  ]) 

  
    
  return (
    <div className="restaurant-list-container">
      <div className="side-panel">
        <h3>Actions</h3>
        <button onClick={() => {}}>Add Rating</button>
        {/* Add more action buttons here */}
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default RestaurantList;