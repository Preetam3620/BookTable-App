// src/components/AddRestaurantForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./index"; // adjust path if your api helper is located elsewhere

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
    cost_rating: "",
    email: "",
    phone_number: "",
    operating_hours: [
      { day_of_week: "", opening_time: "", closing_time: "" },
    ],
  });
  const [errors, setErrors] = useState({});

  // Dropdown data
  const daysOfWeek = [
    "Monday","Tuesday","Wednesday","Thursday",
    "Friday","Saturday","Sunday",
  ];
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const h = String(Math.floor(i / 2)).padStart(2, "0");
    const m = i % 2 ? "30" : "00";
    return `${h}:${m}`;
  });

  const validate = () => {
    const newErrors = {};

    // 1) Basic field validation
    if (!formData.name.trim()) newErrors.name = "Restaurant name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.address_line1.trim())
      newErrors.address_line1 = "Address Line 1 is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zip_code.trim())
      newErrors.zip_code = "Zip code is required.";
    if (!formData.cost_rating.trim()) {
      newErrors.cost_rating = "Cost rating is required.";
    } else if (!/^[1-5]$/.test(formData.cost_rating)) {
      newErrors.cost_rating = "Cost rating must be between 1 and 5.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "Phone number must be in the format 555-123-4567.";
    }

    // 2) Per‐slot presence and ordering
    formData.operating_hours.forEach((slot, i) => {
      const dKey = `oh.${i}.d`;
      const oKey = `oh.${i}.o`;
      const cKey = `oh.${i}.c`;

      if (!slot.day_of_week) {
        newErrors[dKey] = "Day is required.";
      }
      if (!slot.opening_time) {
        newErrors[oKey] = "Opening time is required.";
      }
      if (!slot.closing_time) {
        newErrors[cKey] = "Closing time is required.";
      }
      if (
        slot.opening_time &&
        slot.closing_time &&
        slot.opening_time >= slot.closing_time
      ) {
        newErrors[oKey] = "Must be before closing time.";
      }
    });

    // 3) Check overlaps per day
    const byDay = formData.operating_hours.reduce((acc, slot, i) => {
      if (slot.day_of_week && slot.opening_time && slot.closing_time) {
        acc[slot.day_of_week] = acc[slot.day_of_week] || [];
        acc[slot.day_of_week].push({
          open: slot.opening_time,
          close: slot.closing_time,
          idx: i,
        });
      }
      return acc;
    }, {});

    Object.entries(byDay).forEach(([day, ranges]) => {
      // sort by opening_time
      ranges.sort((a, b) => (a.open < b.open ? -1 : 1));
      for (let j = 0; j < ranges.length - 1; j++) {
        const cur = ranges[j];
        const next = ranges[j + 1];
        if (cur.close > next.open) {
          newErrors[`oh.${cur.idx}.c`] = `Overlaps another slot on ${day}.`;
          newErrors[`oh.${next.idx}.o`] = `Overlaps previous slot on ${day}.`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: "" }));
  };

  const handleHoursChange = (idx, e) => {
    const { name, value } = e.target;
    setFormData((f) => {
      const oh = [...f.operating_hours];
      oh[idx] = { ...oh[idx], [name]: value };
      return { ...f, operating_hours: oh };
    });
    setErrors((errs) => ({ ...errs, [`oh.${idx}.${name[0]}`]: "" }));
  };

  const addHoursRow = () => {
    setFormData((f) => ({
      ...f,
      operating_hours: [
        ...f.operating_hours,
        { day_of_week: "", opening_time: "", closing_time: "" },
      ],
    }));
  };

  const removeHoursRow = (idx) => {
    setFormData((f) => {
      const oh = f.operating_hours.filter((_, i) => i !== idx);
      return { ...f, operating_hours: oh };
    });
    setErrors((errs) => {
      const cleaned = { ...errs };
      ["d","o","c"].forEach((s) => delete cleaned[`oh.${idx}.${s}`]);
      return cleaned;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      created_at: new Date().toISOString(),
      restaurant_id: Date.now(),
    };

    try {
      await API.post("/manager/restaurants", payload);
      alert("Restaurant submitted successfully!");
      navigate("/managerDashboard");
    } catch (err) {
      console.error("Submission error:", err);
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
                value={formData.name}
                placeholder="Restaurant Name"
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            {/* Description */}
            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                placeholder="Description"
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

            {/* Address */}
            <div className="form-group">
              <input
                type="text"
                name="address_line1"
                value={formData.address_line1}
                placeholder="Address Line 1"
                onChange={handleChange}
              />
              {errors.address_line1 && (
                <span className="error-text">{errors.address_line1}</span>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address_line2"
                value={formData.address_line2}
                placeholder="Address Line 2"
                onChange={handleChange}
              />
            </div>

            {/* City / State / Zip */}
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={formData.city}
                placeholder="City"
                onChange={handleChange}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="state"
                value={formData.state}
                placeholder="State"
                onChange={handleChange}
              />
              {errors.state && <span className="error-text">{errors.state}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                placeholder="Zip Code"
                onChange={handleChange}
              />
              {errors.zip_code && (
                <span className="error-text">{errors.zip_code}</span>
              )}
            </div>

            {/* Cost Rating */}
            <div className="form-group">
              <input
                type="text"
                name="cost_rating"
                value={formData.cost_rating}
                placeholder="Cost Rating (1-5)"
                onChange={handleChange}
              />
              {errors.cost_rating && (
                <span className="error-text">{errors.cost_rating}</span>
              )}
            </div>

            {/* Contact */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                placeholder="Phone Number (e.g. 555-123-4567)"
                onChange={handleChange}
              />
              {errors.phone_number && (
                <span className="error-text">{errors.phone_number}</span>
              )}
            </div>

            {/* Operating Hours */}
            <div className="form-group">
              <label>Operating Hours</label>
              {formData.operating_hours.map((slot, i) => (
                <div key={i} className="hours-row">
                  <select
                    name="day_of_week"
                    value={slot.day_of_week}
                    onChange={(e) => handleHoursChange(i, e)}
                    className="selectDescription"
                  >
                    <option value="">Select Day</option>
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d.toLowerCase()}>
                        {d}
                      </option>
                    ))}
                  </select>
                  {errors[`oh.${i}.d`] && (
                    <span className="error-text">{errors[`oh.${i}.d`]}</span>
                  )}

                  <select
                    name="opening_time"
                    value={slot.opening_time}
                    onChange={(e) => handleHoursChange(i, e)}
                    className="selectDescription"
                  >
                    <option value="">Opening Time</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors[`oh.${i}.o`] && (
                    <span className="error-text">{errors[`oh.${i}.o`]}</span>
                  )}

                  <select
                    name="closing_time"
                    value={slot.closing_time}
                    onChange={(e) => handleHoursChange(i, e)}
                    className="selectDescription"
                  >
                    <option value="">Closing Time</option>
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors[`oh.${i}.c`] && (
                    <span className="error-text">{errors[`oh.${i}.c`]}</span>
                  )}

                  {formData.operating_hours.length > 1 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeHoursRow(i)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-button"
                onClick={addHoursRow}
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
