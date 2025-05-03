import React,{useState} from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";


const dummyRestaurants = [
    {
      restaurant_id: 1,
      name: "Saffron Palace",
      cuisine_type: "indian",
      cost_rating: "$$",
      rating: 4.6,
      reviews: 210,
      times_booked_today: 18,
      city: "New York",
      state: "NY",
      zipcode: "10001",
      availability: ["17:00", "17:30", "18:00", "18:30", "19:00"],
    },
    {
      restaurant_id: 2,
      name: "Tokyo Bites",
      cuisine_type: "japanese",
      cost_rating: "$$$",
      rating: 4.8,
      reviews: 324,
      times_booked_today: 23,
      city: "San Francisco",
      state: "CA",
      zipcode: "94102",
      availability: ["16:30", "17:00", "17:30", "18:00", "19:00"],
    },
    {
      restaurant_id: 3,
      name: "La Belle Cuisine",
      cuisine_type: "french",
      cost_rating: "$$$",
      rating: 4.7,
      reviews: 150,
      times_booked_today: 12,
      city: "Boston",
      state: "MA",
      zipcode: "02108",
      availability: ["17:30", "18:00", "18:30", "19:00", "19:30"],
    },
    {
      restaurant_id: 4,
      name: "Green Bowl",
      cuisine_type: "mediterranean",
      cost_rating: "$$",
      rating: 4.4,
      reviews: 102,
      times_booked_today: 9,
      city: "Seattle",
      state: "WA",
      zipcode: "98101",
      availability: ["16:00", "16:30", "17:00", "17:30"],
    },
    {
      restaurant_id: 5,
      name: "Taco Haven",
      cuisine_type: "mexican",
      cost_rating: "$",
      rating: 4.2,
      reviews: 89,
      times_booked_today: 7,
      city: "Austin",
      state: "TX",
      zipcode: "73301",
      availability: ["17:00", "17:30", "18:00", "18:30"],
    },
    {
      restaurant_id: 6,
      name: "Chopsticks & Wok",
      cuisine_type: "chinese",
      cost_rating: "$$",
      rating: 4.3,
      reviews: 178,
      times_booked_today: 15,
      city: "Chicago",
      state: "IL",
      zipcode: "60601",
      availability: ["16:30", "17:00", "17:30", "18:00", "18:30"],
    },
    {
      restaurant_id: 7,
      name: "Olive Grove",
      cuisine_type: "italian",
      cost_rating: "$$$",
      rating: 4.9,
      reviews: 310,
      times_booked_today: 30,
      city: "Los Angeles",
      state: "CA",
      zipcode: "90001",
      availability: ["18:00", "18:30", "19:00", "19:30"],
    },
    {
      restaurant_id: 8,
      name: "Spice Symphony",
      cuisine_type: "thai",
      cost_rating: "$$",
      rating: 4.5,
      reviews: 192,
      times_booked_today: 11,
      city: "Denver",
      state: "CO",
      zipcode: "80202",
      availability: ["17:00", "17:30", "18:00", "18:30"],
    },
    {
      restaurant_id: 9,
      name: "Bay Bites",
      cuisine_type: "american",
      cost_rating: "$",
      rating: 4.1,
      reviews: 64,
      times_booked_today: 6,
      city: "Tampa",
      state: "FL",
      zipcode: "33602",
      availability: ["16:30", "17:00", "17:30", "18:00"],
    },
    {
      restaurant_id: 10,
      name: "Urban Tandoor",
      cuisine_type: "indian",
      cost_rating: "$$",
      rating: 4.6,
      reviews: 145,
      times_booked_today: 19,
      city: "Philadelphia",
      state: "PA",
      zipcode: "19103",
      availability: ["17:30", "18:00", "18:30", "19:00", "19:30"],
    },
  ];

  
const BookRestaurant = () => {
  const [specialRequest, setSpecialRequest] = useState("");
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const people = searchParams.get("people");
  const time = searchParams.get("time");
  const date = searchParams.get("date");
  const restaurant = dummyRestaurants.find(
    (r) => r.restaurant_id === parseInt(id)
  );

  if (!restaurant) return <p>Restaurant not found.</p>;

  const handleBook = () => {
    alert(`✅ Table booked at ${restaurant.name} for ${time}. Confirmation sent!`);
    // In real app: send API request, email/SMS
  };

  const handleCancel = () => {
    alert("❌ Booking canceled.");
    navigate("/");
  };

  return (
    <div className="book-bg">
    <div className="booking-container">
      <h2>Booking at {restaurant.name}</h2>
      <p><strong>Time:</strong> {time}</p>
      <p><strong>Time:</strong> {new Date(date).toLocaleString()}</p>
      <p><strong>Party Size:</strong> {people}</p>
      <p><strong>Cuisine:</strong> {restaurant.cuisine_type}</p>
      <p><strong>Rating:</strong> ⭐ {restaurant.rating} ({restaurant.reviews} reviews)</p>

      <h4>📍 Location</h4>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${restaurant.name}+${restaurant.city}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Google Maps
      </a>

      <h4>📝 Special Requests</h4>
        <textarea
          className="special-request-textarea"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
          placeholder="E.g. Table near the window, vegetarian meal..."
          rows={4}
        />

      <h4>🪑 Booking Actions</h4>
      <button onClick={handleBook}>Book Table</button>
      <button onClick={handleCancel}>Cancel Booking</button>
    </div>
    </div>
  );
};

export default BookRestaurant;
