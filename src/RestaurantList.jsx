// FI: Ravintolalistan sivu – hakee listan backendista ja linkit arvioihin
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "./api";

export default function RestaurantList() {
  // FI: UI-tila
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr("");

      // FI: Jotkin toteutukset käyttävät eri polkua → kokeillaan useampaa
      const candidatePaths = [
        "/api/restaurants/", // tavallisin
        "/api/restaurants",
        "/api/restaurant/",
        "/api/restaurant",
      ];

      let loaded = false;
      for (const p of candidatePaths) {
        try {
          const data = await apiGet(p);
          const list = Array.isArray(data)
            ? data
            : (data?.items ?? data?.restaurants ?? []);
          if (Array.isArray(list)) {
            setItems(list);
            loaded = true;
            break;
          }
        } catch (e) {
          // FI: 404 → kokeile seuraavaa polkua
        }
      }

      if (!loaded) {
        // FI: Varasuunnitelma — jos listapolku puuttuu backendistä,
        // näytetään vähintään linkit, jotta pääsee tehtävän 4 sivulle testaamaan
        setErr("Ravintolalistan haku epäonnistui (404). Näytetään varalinkit.");
        setItems([
          { id: 1, name: "Ravintola 1" },
          { id: 2, name: "Ravintola 2" },
        ]);
      }

      setLoading(false);
    })();
  }, []);

  if (loading) return <p style={{ padding: 16 }}>Ladataan…</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Restaurants</h2>

      {err && (
        <p style={{ color: "red", marginTop: 0 }}>
          {err}
        </p>
      )}

      {items.length === 0 && <p>Ei ravintoloita.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((r) => (
          <li
            key={r.id}
            style={{ borderTop: "1px solid #eee", padding: "8px 0" }}
          >
            {/* FI: Linkki arvosivulle /restaurants/:id/ratings */}
            <Link to={`/restaurants/${r.id}/ratings`}>
              {r.name ?? `Ravintola ${r.id}`}
            </Link>
            {" — "}
            <span>arvosana: {r.rating ?? "-"}</span>
            {"  "}
            <span>arvioita: {r.review_count ?? 0} kpl</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
