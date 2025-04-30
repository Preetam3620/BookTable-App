import React, { useEffect, useState } from "react";

const CustomerBookings = () => {
  const [reservations, setReservations] = useState([]);
  const [selected, setSelected] = useState(null); // selected reservation for review
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const dummyReservations = [
      {
        reservation_id: 1,
        restaurant_id: 1,
        restaurant_name: "Saffron Palace",
        reservation_time: "2024-06-01T18:30:00",
        party_size: 4,
        status: "COMPLETED",
      },
      {
        reservation_id: 2,
        restaurant_id: 2,
        restaurant_name: "Tokyo Bites",
        reservation_time: "2024-06-05T19:00:00",
        party_size: 2,
        status: "CONFIRMED",
      },
      {
        reservation_id: 3,
        restaurant_id: 3,
        restaurant_name: "La Belle Cuisine",
        reservation_time: "2024-05-25T17:00:00",
        party_size: 3,
        status: "COMPLETED",
      },
    ];
  
    setReservations(dummyReservations);
  }, []);
  

 // use when will integrate backend
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     fetch("/api/customer/reservations", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setReservations(data))
//       .catch((err) => console.error("Failed to fetch reservations:", err));
//   }, []);

  const handleReviewSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          restaurant_id: selected.restaurant_id,
          rating: parseInt(rating),
          comment: comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      alert("✅ Review submitted!");
      setSelected(null);
      setRating(5);
      setComment("");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("❌ Could not submit review. Please try again.");
    }
  };

  return (
    <div className="customer-bookings">
    <div className="customer-bookings-content">
      <h2>My Bookings</h2>
      {reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        reservations.map((res) => (
          <div key={res.reservation_id} className="result-card">
            <h3>{res.restaurant_name}</h3>
            <p>
              Date: {new Date(res.reservation_time).toLocaleDateString()} | Time:{" "}
              {new Date(res.reservation_time).toLocaleTimeString()}
            </p>
            <p>Party Size: {res.party_size}</p>
            <p>Status: {res.status}</p>

            {res.status === "COMPLETED" && (
              <button onClick={() => setSelected(res)}>Leave a Review</button>
            )}
          </div>
        ))
      )}

      {selected && (
        <div className="review-modal">
          <h3>Review for {selected.restaurant_name}</h3>

          <label>
                Rating:
                <select
                    className="review-rating-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{ marginLeft: "10px", color: "black" }}
                >
                    {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                    ))}
                </select>
                </label>
          <br />
          <textarea
            className="special-request-textarea"
            rows={4}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ marginTop: "10px", width: "100%" }}
          />

          <br />
          <button onClick={handleReviewSubmit}>Submit Review</button>
          <button onClick={() => setSelected(null)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default CustomerBookings;
