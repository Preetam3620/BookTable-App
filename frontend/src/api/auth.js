import API from "../api";

export const loginUser = async (formData) => {
  try {
    const response = await API.post("/login", formData);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const getAllAdminRestaurants = async (data) => {
  try {
    const response = await API.get("/admin/restaurants");
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const adminApproveRestaurant = async (data) => {
  try {
    const response = await API.put(
      `/admin/restaurants/${data.restaurantId}/approve`
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const adminRemoveRestaurant = async (data) => {
  try {
    const response = await API.delete(
      `/admin/restaurants/${data.restaurantId}`
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const managerAddRestaurant = async (data) => {
  try {
    const response = await API.post("/manager/restaurants", data);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const getAllRestaurantsForManager = async (data) => {
  try {
    const response = await API.get("/manager/restaurants");
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const getRestaurantDetailForManager = async (data) => {
  try {
    const response = await API.get(`/manager/restaurants/${data.id}`);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const updateRestaurantForManager = async (data) => {
  try {
    const response = await API.put(
      `/manager/restaurants/${data.id}`,
      data.restaurant
    );
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
