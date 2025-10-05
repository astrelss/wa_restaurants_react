import { apiGet, apiDelete } from "./api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RatingsByRestaurant() {
  // --- Reitin parametrit ---
  const { id } = useParams();
  const resid = Number(id);

  // --- UI-tila ---
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // --- Uuden arvion lomakkeen tila ---
  const [rating, setRating] = useState(5); // 1–5
  const [comment, setComment] = useState("");

  // --- Arvioiden haku ---
  async function load() {
    try {
      setLoading(true);
      setErr("");
      const data = await apiGet(`/api/restaurants/${resid}/ratings`);
      const list = Array.isArray(data)
        ? data
        : data?.items ?? data?.ratings ?? [];
      setRatings(list);
    } catch (e) {
      setErr(`Virhe: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [resid]);

  // --- Poisto ---
  async function handleDelete(ratingId) {
    if (!confirm("Poistetaanko tämä arvio?")) return;
    try {
      await apiDelete(`/api/restaurants/${resid}/ratings/${ratingId}`);
      setRatings((prev) => prev.filter((x) => x.id !== ratingId));
    } catch (e) {
      alert(`Virhe poistossa: ${e.message}`);
    }
  }

  // --- Lisäys (POST) ---
  async function handleAdd(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/restaurants/${resid}/ratings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: Number(rating),
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status} — ${txt}`);
      }

      await load();
      setRating(5);
      setComment("");
    } catch (e2) {
      alert(`Virhe lisäyksessä: ${e2.message}`);
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <p>
        <Link to="/restaurants">← Takaisin listaan</Link>
      </p>

      <h2>
        Ravintolan {Number.isNaN(resid) ? "?" : resid} arviot (
        {ratings.length} kpl)
      </h2>

      {loading && <p>Ladataan…</p>}
      {err && <p style={{ color: "red" }}>{err}</p>}
      {!loading && !err && ratings.length === 0 && <p>Ei arvioita vielä.</p>}

      {/* FI: Lista arvioista */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {ratings.map((r) => (
          <li
            key={r.id}
            style={{
              borderTop: "1px solid #ddd",
              padding: "12px 4px",
              position: "relative",
            }}
          >
            <div>★ {r.value ?? r.rating ?? "-"} / 5</div>
            <div style={{ fontSize: 12, color: "#666" }}>
              {r.description ?? r.comment ?? "(ei kommenttia)"}
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              style={{ position: "absolute", right: 8, top: 8 }}
            >
              Poista
            </button>
          </li>
        ))}
      </ul>

      {/* FI: Uuden arvion lomake (POST) */}
      <h3 style={{ marginTop: 24 }}>Lisää arvio</h3>
      <form onSubmit={handleAdd} style={{ maxWidth: 420 }}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Pisteet (1–5):{" "}
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              style={{ width: 80 }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Kommentti:{" "}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              style={{ width: 300 }}
            />
          </label>
        </div>
        <button type="submit">Tallenna</button>
      </form>
    </div>
  );
}
