import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRestaurantForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cuisine_type: "italian",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipcode: "",
    email: "",
    phone_number: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Restaurant name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = "Address Line 1 is requried.";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validate()) return;
  
    const newRestaurant = {
      ...formData,
      created_at: new Date().toISOString(),
      restaurant_id: Date.now(),
    };
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch("/api/manager/restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRestaurant),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add restaurant");
      }
  
      const data = await response.json();
  
      console.log("New restaurant added:", data);
      alert("Restaurant submitted successfully!");
  
      setFormData({
        name: "",
        description: "",
        cuisine_type: "italian",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipcode: "",
        email: "",
        phone_number: "",
      });
  
      setErrors({});
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

        <div className="form-group">
          <textarea
            className="selectDescription"
            name="description"
            value={formData.description}
            placeholder="Description"
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}
        </div>
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

        <div className="form-group">
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            placeholder="Address Line 1"
            onChange={handleChange}
          />
          {errors.addressLine1 && (
            <span className="error-text">{errors.addressLine1}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            placeholder="Address Line 2"
            onChange={handleChange}
          />
        </div>

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
            name="zipcode"
            value={formData.zipcode}
            placeholder="Zipcode"
            onChange={handleChange}
          />
          {errors.zipcode && (
            <span className="error-text">{errors.zipcode}</span>
          )}
        </div>

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
