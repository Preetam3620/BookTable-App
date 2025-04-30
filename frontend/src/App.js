import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import WelcomePage from "./WelcomePage";
//import CustomerView from './CustomerView';
import AddRestaurantForm from "./AddRestaurantForm";
import AdminAnalytics from "./AdminAnalytics";
import AdminDashboard from "./AdminDashboard";
import ManagerDashboard from "./ManagerDashboard";
import Register from "./Register"; // Import the Register component
import BookRestaurant from "./BookRestaurant";
import CustomerRestaurantSearch from "./CustomerRestaurantSearch";
import RestaurantList from "./RestaurantList";
import CustomerBookings from "./CustomerBookings";


import "./styles.css";
import UpdateRestaurant from "./UpdateRestaurant";

// Check if the user is authenticated and get their role from localStorage
const isAuthenticated = () => {
  return localStorage.getItem("role") !== null;
};

// Function to get the current user role
const getRole = () => {
  return localStorage.getItem("role");
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page (Home page) */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/managerDashboard" element={<ManagerDashboard />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/list" element={<RestaurantList />} />
        <Route path="/book/:id" element={<BookRestaurant />} />

        <Route path="/update/:id" element={<UpdateRestaurant />} />
        <Route path="/adminAnalytics" element={<AdminAnalytics />} />
        <Route path="/addRestaurantForm" element={<AddRestaurantForm />} />
        <Route path="/custDashboard" element={<CustomerRestaurantSearch />} />
        <Route path="/my-bookings" element={<CustomerBookings />} />

      </Routes>
    </Router>
  );
}

export default App;
