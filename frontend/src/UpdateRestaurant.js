import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRestaurantDetailForManager,
  updateRestaurantForManager,
} from "./api/auth";

const CostRatingEnum = Object.freeze({
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
});

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const UpdateRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRestaurantDetailForManager({ id });
        if (!res.operating_hours || !Array.isArray(res.operating_hours)) {
          res.operating_hours = [
            { day_of_week: "", opening_time: "", closing_time: "" },
          ];
        }
        setRestaurant(res);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "cost_rating") {
      newValue = CostRatingEnum[value] ?? "";
    }
    setRestaurant((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleHoursChange = (idx, field, value) => {
    setRestaurant((prev) => {
      const hrs = prev.operating_hours.map((h, i) =>
        i === idx ? { ...h, [field]: value } : h
      );
      return { ...prev, operating_hours: hrs };
    });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`operating_hours.${idx}.${field}`];
      return copy;
    });
  };

  const addOperatingHour = () => {
    setRestaurant((prev) => ({
      ...prev,
      operating_hours: [
        ...prev.operating_hours,
        { day_of_week: "", opening_time: "", closing_time: "" },
      ],
    }));
  };

  const removeOperatingHour = (idx) => {
    setRestaurant((prev) => ({
      ...prev,
      operating_hours: prev.operating_hours.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRestaurantForManager({id, restaurant});
      alert("Restaurant updated successfully!");
      navigate("/managerDashboard");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Error updating restaurant.");
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="add-restaurant-bg">
      <div className="add-restaurant-overlay">
        <div className="add-restaurant-container">
          <h2>Update Restaurant</h2>
          <form onSubmit={handleSubmit} className="restaurant-form" noValidate>
            <div className="form-group">
              <input
                name="name"
                value={restaurant.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className="form-group">
              <textarea
                name="description"
                value={restaurant.description}
                onChange={handleChange}
                placeholder="Description"
                className="selectDescription"
              />
            </div>

            <div className="form-group">
              <select
                name="cuisine_type"
                value={restaurant.cuisine_type}
                onChange={handleChange}
                className="selectDescription"
              >
                <option value="italian">Italian</option>
                <option value="chinese">Chinese</option>
                <option value="indian">Indian</option>
                <option value="japanese">Japanese</option>
                <option value="mexican">Mexican</option>
                <option value="french">French</option>
                <option value="american">American</option>
                <option value="thai">Thai</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <input
                name="address_line1"
                value={restaurant.address_line1}
                onChange={handleChange}
                placeholder="Address Line 1"
              />
            </div>
            <div className="form-group">
              <input
                name="address_line2"
                value={restaurant.address_line2}
                onChange={handleChange}
                placeholder="Address Line 2"
              />
            </div>

            <div className="form-group">
              <input
                name="city"
                value={restaurant.city}
                onChange={handleChange}
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <input
                name="state"
                value={restaurant.state}
                onChange={handleChange}
                placeholder="State"
              />
            </div>
            <div className="form-group">
              <input
                name="zip_code"
                value={restaurant.zip_code}
                onChange={handleChange}
                placeholder="Zip Code"
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                value={restaurant.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                name="phone_number"
                value={restaurant.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group">
              <select
                name="cost_rating"
                value={restaurant.cost_rating}
                onChange={handleChange}
                className="selectDescription"
              >
                <option value="">-- Cost Rating --</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
              </select>
            </div>

            <div className="form-group">
              <label>Operating Hours</label>
              {restaurant.operating_hours.map((h, idx) => (
                <div key={idx} className="hours-row">
                  <select
                    value={h.day_of_week}
                    onChange={(e) =>
                      handleHoursChange(idx, "day_of_week", e.target.value)
                    }
                    className="selectDescription"
                  >
                    <option value="">Day of Week</option>
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                  <input
                    type="time"
                    value={h.opening_time}
                    onChange={(e) =>
                      handleHoursChange(idx, "opening_time", e.target.value)
                    }
                  />
                  <input
                    type="time"
                    value={h.closing_time}
                    onChange={(e) =>
                      handleHoursChange(idx, "closing_time", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="remove-hour-btn"
                    onClick={() => removeOperatingHour(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-hour-btn"
                onClick={addOperatingHour}
              >
                + Add Hours
              </button>
            </div>

            <button type="submit" className="submit-button">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRestaurant;
