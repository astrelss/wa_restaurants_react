import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';

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
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default RestaurantList;