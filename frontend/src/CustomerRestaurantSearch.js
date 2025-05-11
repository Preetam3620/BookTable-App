import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getAllCustomers } from "./api/auth";

export const dummyRestaurants = [
  {
    restaurant_id: 100,
    name: "Saffron Palace",
    description: "A fine dining experience with authentic cuisine.",
    cuisine_type: "mediterranean",
    cost_rating: 2,
    avg_rating: 3.7,
    reviews: 270,
    times_booked_today: 1,
    address_line1: "100 Main St",
    address_line2: "Suite 258",
    city: "New York",
    state: "NY",
    zip_code: "83988",
    phone_number: "555-377-2246",
    email: "contact0@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-12T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:30",
      "19:00",
      "19:30",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["13:30", "09:30", "18:00", "13:00", "20:00"],
  },
  {
    restaurant_id: 101,
    name: "Tokyo Bites",
    description: "Fusion flavors in a contemporary setting.",
    cuisine_type: "mediterranean",
    cost_rating: 2,
    avg_rating: 4.3,
    reviews: 82,
    times_booked_today: 17,
    address_line1: "101 Main St",
    address_line2: "Suite 215",
    city: "San Francisco",
    state: "CA",
    zip_code: "57036",
    phone_number: "555-647-1123",
    email: "contact1@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-01-03T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["10:00", "19:00"],
  },
  {
    restaurant_id: 102,
    name: "La Belle Cuisine",
    description: "Classic dishes served in a cozy atmosphere.",
    cuisine_type: "french",
    cost_rating: 2,
    avg_rating: 3.7,
    reviews: 181,
    times_booked_today: 30,
    address_line1: "102 Main St",
    address_line2: "Suite 418",
    city: "Boston",
    state: "MA",
    zip_code: "98724",
    phone_number: "555-241-7476",
    email: "contact2@restaurant.com",
    is_approved: true,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-18T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:30",
      "22:00",
    ],
    booked_slots: ["21:00", "17:00"],
  },
  {
    restaurant_id: 103,
    name: "Green Bowl",
    description: "Health-conscious meals and vibrant ambiance.",
    cuisine_type: "indian",
    cost_rating: 3,
    avg_rating: 4.5,
    reviews: 171,
    times_booked_today: 8,
    address_line1: "103 Main St",
    address_line2: "Suite 469",
    city: "Seattle",
    state: "WA",
    zip_code: "45255",
    phone_number: "555-220-1456",
    email: "contact3@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2024-11-13T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:30",
      "13:00",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:30",
      "19:00",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ],
    booked_slots: ["18:00", "19:30", "22:00", "13:30", "12:00"],
  },
  {
    restaurant_id: 104,
    name: "Taco Haven",
    description: "Quick bites with bold tastes.",
    cuisine_type: "mediterranean",
    cost_rating: 1,
    avg_rating: 4.0,
    reviews: 258,
    times_booked_today: 28,
    address_line1: "104 Main St",
    address_line2: "Suite 328",
    city: "Austin",
    state: "TX",
    zip_code: "99362",
    phone_number: "555-876-8834",
    email: "contact4@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-02-03T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["19:00", "10:00"],
  },
  {
    restaurant_id: 105,
    name: "Chopsticks & Wok",
    description: "Modern twist on traditional fare.",
    cuisine_type: "american",
    cost_rating: 4,
    avg_rating: 4.5,
    reviews: 225,
    times_booked_today: 14,
    address_line1: "105 Main St",
    address_line2: "Suite 163",
    city: "Chicago",
    state: "IL",
    zip_code: "97200",
    phone_number: "555-887-4487",
    email: "contact5@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2024-12-15T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["13:00"],
  },
  {
    restaurant_id: 106,
    name: "Olive Grove",
    description: "Authentic recipes with a modern touch.",
    cuisine_type: "mexican",
    cost_rating: 2,
    avg_rating: 4.3,
    reviews: 146,
    times_booked_today: 14,
    address_line1: "106 Main St",
    address_line2: "Suite 288",
    city: "Denver",
    state: "CO",
    zip_code: "14959",
    phone_number: "555-650-3558",
    email: "contact6@restaurant.com",
    is_approved: true,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-02-09T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:30",
      "11:00",
      "12:00",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["12:30", "10:00", "17:00", "16:30", "11:30"],
  },
  {
    restaurant_id: 107,
    name: "Spice Symphony",
    description: "Savor global street food favorites.",
    cuisine_type: "mediterranean",
    cost_rating: 1,
    avg_rating: 4.6,
    reviews: 153,
    times_booked_today: 1,
    address_line1: "107 Main St",
    address_line2: "Suite 210",
    city: "Tampa",
    state: "FL",
    zip_code: "17378",
    phone_number: "555-300-9703",
    email: "contact7@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-06T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ],
    booked_slots: ["22:00", "11:30"],
  },
  {
    restaurant_id: 108,
    name: "Bay Bites",
    description: "Casual comfort food made right.",
    cuisine_type: "american",
    cost_rating: 3,
    avg_rating: 3.9,
    reviews: 211,
    times_booked_today: 15,
    address_line1: "108 Main St",
    address_line2: "Suite 294",
    city: "Philadelphia",
    state: "PA",
    zip_code: "96764",
    phone_number: "555-342-3341",
    email: "contact8@restaurant.com",
    is_approved: true,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-23T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: [],
  },
  {
    restaurant_id: 109,
    name: "Urban Tandoor",
    description: "Signature dishes from family recipes.",
    cuisine_type: "french",
    cost_rating: 1,
    avg_rating: 4.9,
    reviews: 56,
    times_booked_today: 16,
    address_line1: "109 Main St",
    address_line2: "Suite 109",
    city: "New York",
    state: "NY",
    zip_code: "24556",
    phone_number: "555-359-2485",
    email: "contact9@restaurant.com",
    is_approved: false,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-23T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ],
    booked_slots: ["09:30", "17:00", "22:00"],
  },
  {
    restaurant_id: 110,
    name: "Golden Dragon",
    description: "Upscale experience with curated wine list.",
    cuisine_type: "japanese",
    cost_rating: 4,
    avg_rating: 4.0,
    reviews: 263,
    times_booked_today: 5,
    address_line1: "110 Main St",
    address_line2: "Suite 142",
    city: "San Francisco",
    state: "CA",
    zip_code: "56579",
    phone_number: "555-410-2459",
    email: "contact10@restaurant.com",
    is_approved: true,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-18T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: [],
  },
  {
    restaurant_id: 111,
    name: "Bella Italia",
    description: "Freshly prepared meals with seasonal ingredients.",
    cuisine_type: "indian",
    cost_rating: 3,
    avg_rating: 4.8,
    reviews: 172,
    times_booked_today: 9,
    address_line1: "111 Main St",
    address_line2: "Suite 499",
    city: "Boston",
    state: "MA",
    zip_code: "55916",
    phone_number: "555-652-9308",
    email: "contact11@restaurant.com",
    is_approved: true,
    approved_at: "2025-05-11T02:46:18.213814",
    created_at: "2025-03-02T02:46:18.213814",
    updated_at: "2025-05-11T02:46:18.213814",
    photos: [],
    operating_hours: [],
    available_slots: [
      "09:30",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ],
    booked_slots: ["19:30", "09:00", "10:00"],
  },
];

const CustomerRestaurantSearch = () => {
  const [filters, setFilters] = useState({
    date: "",
    time: "",
    people: "",
    location: "",
  });

  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getAllCustomers();
        setRestaurants(data);
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

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
        r.zip_code.includes(filters.location);

      const hasAvailableSlot = r.available_slots?.some(
        (slot) => nearbyTimes.includes(slot) && !r.booked_slots?.includes(slot)
      );

      return matchesLocation && hasAvailableSlot;
    });

    setResults(filtered);
    setHasSearched(true);
  };

  const handleBooking = (restaurant, time) => {
    navigate(
      `/book/${restaurant.restaurant_id}?time=${time}&datetime=${filters.date}&people=${filters.people}`
    );
  };

  return (
    <>
      <Header />
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
                    Cuisine: <strong>{r.cuisine_type}</strong> | Cost: {""}
                    <strong>{"$".repeat(r.cost_rating)}</strong>
                  </p>
                  <p>
                    ⭐ {r.avg_rating} ({r.reviews} reviews) | Booked {""}
                    {r.times_booked_today} times today
                  </p>
                  <p>
                    <Link
                      to={`/read-review?restaurant_id=${r.restaurant_id}`}
                      className="review-link"
                    >
                      📖 Read Reviews
                    </Link>
                  </p>

                  {hasSearched && filters.time && (
                    <div className="slots">
                      {r.available_slots
                        ?.filter(
                          (slot) =>
                            getNearbyTimes(filters.time).includes(slot) &&
                            !r.booked_slots?.includes(slot)
                        )
                        .map((slot) => (
                          <button
                            key={slot}
                            onClick={() => handleBooking(r, slot)}
                            className="slot-btn"
                          >
                            {slot}
                          </button>
                        ))}
                      {r.available_slots?.filter(
                        (slot) =>
                          getNearbyTimes(filters.time).includes(slot) &&
                          !r.booked_slots?.includes(slot)
                      ).length === 0 && (
                        <p style={{ color: "#ccc", marginTop: "8px" }}>
                          No available slots near this time.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRestaurantSearch;
