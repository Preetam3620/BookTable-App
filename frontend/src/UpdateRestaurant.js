
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const dummyData = [
  {
    restaurant_id: 1,
    name: "The Fancy Fork",
    description: "A fine dining experience with international cuisine.",
    city: "San Francisco",
    state: "CA",
    email: "contact@fancyfork.com",
    phone_number: "(415) 123-4567",
  },
];

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    // Simulate fetching restaurant by ID
    const found = dummyData.find((r) => r.restaurant_id === parseInt(id));
    if (found) setRestaurant(found);
  }, [id]);

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    navigate("/managerDashboard"); // navigate back to list after save
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="update-restaurant-bg">
    <div className="form-container">
      <h2>Update Restaurant</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          name="name"
          value={restaurant.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          name="description"
          value={restaurant.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="city"
          value={restaurant.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          name="state"
          value={restaurant.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          name="email"
          value={restaurant.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="phone_number"
          value={restaurant.phone_number}
          onChange={handleChange}
          placeholder="Phone"
        />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
    </div>
  );
};

export default UpdateRestaurant;
