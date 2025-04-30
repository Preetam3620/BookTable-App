import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const dummyRestaurants = [
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

const CustomerRestaurantSearch = () => {
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    people: "",
    location: "",
  });

  const  navigate = useNavigate();
  const [restaurants] = useState(dummyRestaurants);
  const [results, setResults] = useState(dummyRestaurants); // show all by default
  const [hasSearched, setHasSearched] = useState(false); // track if search clicked

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 22; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const formatted = `${String(hour).padStart(2, "0")}:${String(
          min
        ).padStart(2, "0")}`;
        times.push(formatted);
      }
    }
    return times;
  };

  const getNearbyTimes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    const base = new Date(0, 0, 0, h, m);

    const offsets = [-30, 0, 30];
    return offsets.map((offset) => {
      const t = new Date(base.getTime() + offset * 60000);
      return `${String(t.getHours()).padStart(2, "0")}:${String(
        t.getMinutes()
      ).padStart(2, "0")}`;
    });
  };

  const handleSearch = () => {
    if (!filters.date || !filters.time) {
      alert("Please select a date and time.");
      return;
    }
    if (!filters.people || filters.people <= 0) {
      alert("Please enter a valid number of people.");
      return;
    }
    
    const now = new Date();
    const nearbyTimes = getNearbyTimes(filters.time);
    const nearbyDateTimes = nearbyTimes.map(
      (timeStr) => new Date(`${filters.date}T${timeStr}`)
    );
    const anyFutureSlot = nearbyDateTimes.some((dt) => dt > now);

    if (!anyFutureSlot) {
      alert("Date not available. Please select a future time.");
      return;
    }

    const filtered = restaurants.filter((r) => {
      const matchesLocation =
        !filters.location ||
        r.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        r.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        r.zipcode.includes(filters.location);

      const hasTimeMatch = r.availability.some((t) => nearbyTimes.includes(t));

      return matchesLocation && hasTimeMatch;
    });

    setResults(filtered);
    setHasSearched(true);
  };

  const handleBooking = (restaurant, time) => {
    navigate(`/book/${restaurant.restaurant_id}?time=${time}&datetime=${filters.date}&people=${filters.people}`);

    // alert(`🎉 Booking confirmed at ${restaurant.name} for ${time}`);
  };

  return (
    <div className="customer-bg">
    <div className="customer-search-container">
      <h2>Find a Restaurant</h2>

      <div className="filters">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
        />
        <select
          className="filtersSelect"
          name="time"
          value={filters.time}
          onChange={handleChange}
        >
          <option value="">Select Time</option>
          {generateTimeOptions().map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="people"
          placeholder="# People"
          value={filters.people}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="City / State / Zip (optional)"
          value={filters.location}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {results.length === 0 ? (
          <p>No restaurants match your search.</p>
        ) : (
          results.map((r) => (
            <div key={r.restaurant_id} className="result-card">
              <h3>{r.name}</h3>
              <p>
                Cuisine: <strong>{r.cuisine_type}</strong> | Cost:{" "}
                <strong>{r.cost_rating}</strong>
              </p>
              <p>
                ⭐ {r.rating} ({r.reviews} reviews) | Booked{" "}
                {r.times_booked_today} times today
              </p>

              {/* ✅ Only show slots if search was performed */}
              {hasSearched && filters.time && (
                <div className="slots">
                  {r.availability
                    .filter((t) => getNearbyTimes(filters.time).includes(t))
                    .map((t) => (
                      <button
                        key={t}
                        onClick={() => handleBooking(r, t)}
                        className="slot-btn"
                      >
                        {t}
                      </button>
                    ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default CustomerRestaurantSearch;
