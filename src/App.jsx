// FI: Sovelluksen pääkomponentti ja reititys
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import RestaurantList from "./RestaurantList";
import RatingsByRestaurant from "./RatingsByRestaurant";

export default function App() {
  return (
    // FI: Selainpohjainen reititys
    <BrowserRouter>
      {/* FI: Yksinkertainen yläpalkki navigointiin */}
      <nav style={{ padding: "8px 16px", borderBottom: "1px solid #eee" }}>
        <Link to="/restaurants" style={{ marginRight: 12 }}>Restaurants</Link>
        <Link to="/restaurants/1/ratings">Ratings</Link>
      </nav>

      {/* FI: Reitit sivuille */}
      <Routes>
        {/* FI: Etusivu ohjataan listaan */}
        <Route path="/" element={<Navigate to="/restaurants" replace />} />

        {/* FI: Ravintolalista */}
        <Route path="/restaurants" element={<RestaurantList />} />

        {/* FI: Yksittäisen ravintolan arviot (/:id/ratings) */}
        <Route path="/restaurants/:id/ratings" element={<RatingsByRestaurant />} />

        {/* FI: Tuntemattomat polut ohjataan listaan */}
        <Route path="*" element={<Navigate to="/restaurants" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
