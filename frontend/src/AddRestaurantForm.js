import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { managerAddRestaurant } from "./api/auth";

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

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const formatted = `${String(hour).padStart(2, "0")}:${String(
        min
      ).padStart(2, "0")}`;
      times.push(formatted);
    }
  }
  return times;
};

const AddRestaurantForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine_type: "italian",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip_code: "",
    email: "",
    phone_number: "",
    cost_rating: "",
    availability: [],
    operating_hours: [{ day_of_week: "", opening_time: "", closing_time: "" }],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Basic fields
    if (!formData.name.trim()) newErrors.name = "Restaurant name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.address_line1.trim())
      newErrors.address_line1 = "Address Line 1 is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip_code.trim()) newErrors.zip_code = "Zip code is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone_number.replace(/\D/g, ""))) {
      newErrors.phone_number = "Phone number must be 10 digits.";
    }
    if (!formData.cost_rating) {
      newErrors.cost_rating = "Cost rating is required.";
    }

    // Operating hours
    if (
      !Array.isArray(formData.operating_hours) ||
      formData.operating_hours.length === 0
    ) {
      newErrors.operating_hours = "Add at least one operating-hours entry.";
    } else {
      formData.operating_hours.forEach((h, i) => {
        if (!h.day_of_week)
          newErrors[`operating_hours.${i}.day_of_week`] = "Select a day.";
        if (!h.opening_time)
          newErrors[`operating_hours.${i}.opening_time`] =
            "Enter opening time.";
        if (!h.closing_time)
          newErrors[`operating_hours.${i}.closing_time`] =
            "Enter closing time.";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvailabilityChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setFormData((prev) => ({ ...prev, availability: selectedOptions }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "cost_rating") {
      newValue = CostRatingEnum[value] ?? "";
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleHoursChange = (idx, field, value) => {
    setFormData((prev) => {
      const hrs = [...prev.operating_hours];
      hrs[idx] = { ...hrs[idx], [field]: value };
      return { ...prev, operating_hours: hrs };
    });
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[`operating_hours.${idx}.${field}`];
      return copy;
    });
  };

  const addOperatingHour = () => {
    setFormData((prev) => ({
      ...prev,
      operating_hours: [
        ...prev.operating_hours,
        { day_of_week: "", opening_time: "", closing_time: "" },
      ],
    }));
  };

  const removeOperatingHour = (idx) => {
    setFormData((prev) => {
      const hrs = prev.operating_hours.filter((_, i) => i !== idx);
      return { ...prev, operating_hours: hrs };
    });
    setErrors((prev) => {
      const copy = { ...prev };
      Object.keys(copy).forEach((key) => {
        if (key.startsWith(`operating_hours.${idx}.`)) delete copy[key];
      });
      return copy;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await managerAddRestaurant(formData);
      alert("Restaurant submitted successfully!");
      navigate("/managerDashboard");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <div className="add-restaurant-bg">
      <div className="add-restaurant-overlay">
        <div className="add-restaurant-container">
          <h2>Add New Restaurant</h2>
          <form onSubmit={handleSubmit} className="restaurant-form" noValidate>
            {/* Name */}
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Restaurant Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Description */}
            <div className="form-group">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="selectDescription"
              />
              {errors.description && (
                <span className="error-text">{errors.description}</span>
              )}
            </div>

            {/* Cuisine Type */}
            <div className="form-group">
              <select
                name="cuisine_type"
                value={formData.cuisine_type}
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

            {/* Address Line 1 */}
            <div className="form-group">
              <input
                type="text"
                name="address_line1"
                placeholder="Address Line 1"
                value={formData.address_line1}
                onChange={handleChange}
              />
              {errors.address_line1 && (
                <span className="error-text">{errors.address_line1}</span>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="form-group">
              <input
                type="text"
                name="address_line2"
                placeholder="Address Line 2"
                value={formData.address_line2}
                onChange={handleChange}
              />
            </div>

            {/* City */}
            <div className="form-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>

            {/* State */}
            <div className="form-group">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <span className="error-text">{errors.state}</span>
              )}
            </div>

            {/* Zip Code */}
            <div className="form-group">
              <input
                type="text"
                name="zip_code"
                placeholder="Zip Code"
                value={formData.zip_code}
                onChange={handleChange}
              />
              {errors.zip_code && (
                <span className="error-text">{errors.zip_code}</span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <input
                type="text"
                name="phone_number"
                placeholder="Phone Number (10 digits)"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && (
                <span className="error-text">{errors.phone_number}</span>
              )}
            </div>

            {/* Cost Rating */}
            <div className="form-group">
              <select
                name="cost_rating"
                value={formData.cost_rating}
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
              {errors.cost_rating && (
                <span className="error-text">{errors.cost_rating}</span>
              )}
            </div>

            <div className="form-group">
              <label>Select Available Time Slots (30-minute intervals)</label>
              <select
                multiple
                value={formData.availability}
                onChange={handleAvailabilityChange}
                className="selectDescription"
                size={6} // Optional: how many rows to show
              >
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Operating Hours */}
            <div className="form-group">
              <label>Operating Hours</label>
              {errors.operating_hours && (
                <span className="error-text">{errors.operating_hours}</span>
              )}
              {formData.operating_hours.map((h, idx) => (
                <div key={idx} className="hours-row">
                  <select
                    value={h.day_of_week}
                    onChange={(e) =>
                      handleHoursChange(idx, "day_of_week", e.target.value)
                    }
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

            {/* Submit */}
            <button type="submit" className="submit-button">
              Add Restaurant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantForm;
