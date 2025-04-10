import RestaurantList from "./RestaurantList"
import RatingsByRestaurant from "./RatingsByRestaurant";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import your CSS file



function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar (optional) */}
        <nav>
          <ul>
            <li>
              <Link to="/">Ratings</Link>
            </li>
            <li>
              <Link to="/add-restaurant">Restaurants</Link>
            </li>
          </ul>
        </nav>

        {/* Define your routes */}
        <Routes>
        <Route path="/:id" element={<RatingsByRestaurant />} />
        <Route path="/" element={<RestaurantList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
