import React, { useEffect, useState } from "react";
import Header from "./Header";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AdminAnalytics = () => {
  const [recentRestaurants, setRecentRestaurants] = useState([]);
  const [dailyCounts, setDailyCounts] = useState([]);
  const [topCities, setTopCities] = useState([]);

  // 👉 Create dummy data
  const dummyRestaurants = Array.from({ length: 20 }, (_, i) => {
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];
    const states = ["NY", "CA", "IL", "TX", "FL"];
    const randomDaysAgo = Math.floor(Math.random() * 35); // 0-34 days ago
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - randomDaysAgo);

    return {
      restaurant_id: i + 1,
      name: `Restaurant ${i + 1}`,
      description: `A wonderful place for fine dining and great ambience.`,
      city: cities[i % cities.length],
      state: states[i % states.length],
      email: `restaurant${i + 1}@example.com`,
      phone_number: `555-123-${String(i + 1).padStart(4, "0")}`,
      created_at: createdAt.toISOString(),
    };
  });

  // 👉 Filter & process analytics
  useEffect(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const recent = dummyRestaurants.filter(
      (r) => new Date(r.created_at) >= thirtyDaysAgo
    );
    setRecentRestaurants(recent);

    const countsByDay = recent.reduce((acc, r) => {
      const dateKey = new Date(r.created_at).toLocaleDateString();
      acc[dateKey] = (acc[dateKey] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(countsByDay).map(([date, count]) => ({
      date,
      count,
    }));
    setDailyCounts(chartData);

    const cityCounts = recent.reduce((acc, r) => {
      acc[r.city] = (acc[r.city] || 0) + 1;
      return acc;
    }, {});
    const top = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([city, count]) => ({ city, count }));
    setTopCities(top);
  }, []);

// when will integrate with backend

  // useEffect(() => {
  //   const now = new Date();
  //   const thirtyDaysAgo = new Date();
  //   thirtyDaysAgo.setDate(now.getDate() - 30);

  //   // Fetch data from backend API
  //   axios.get("/api/restaurants")
  //     .then((response) => {
  //       // Assuming response.data is the array of restaurants
  //       const allRestaurants = response.data;

  //       // Filter recent restaurants
  //       const recent = allRestaurants.filter(
  //         (r) => new Date(r.created_at) >= thirtyDaysAgo
  //       );
  //       setRecentRestaurants(recent);

  //       // Count by day
  //       const countsByDay = recent.reduce((acc, r) => {
  //         const dateKey = new Date(r.created_at).toLocaleDateString();
  //         acc[dateKey] = (acc[dateKey] || 0) + 1;
  //         return acc;
  //       }, {});

  //       const chartData = Object.entries(countsByDay).map(([date, count]) => ({
  //         date,
  //         count,
  //       }));
  //       setDailyCounts(chartData);

  //       // Top cities
  //       const cityCounts = recent.reduce((acc, r) => {
  //         acc[r.city] = (acc[r.city] || 0) + 1;
  //         return acc;
  //       }, {});
  //       const top = Object.entries(cityCounts)
  //         .sort((a, b) => b[1] - a[1])
  //         .slice(0, 3)
  //         .map(([city, count]) => ({ city, count }));
  //       setTopCities(top);

  //       setLoading(false); // Data is loaded, stop loading state
  //     })
  //     .catch((err) => {
  //       setError("Failed to load data");
  //       setLoading(false); // If error, stop loading state
  //     });
  // }, []); // Runs only once on mount

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }


  return (
    <>
     <Header />
   
    <div className="analytics-bg">
    <div className="admin-analytics">
      <h2 className="analytics-title">📊 Admin Analytics (Last 30 Days)</h2>

      <div className="analytics-cards">
        <div className="stat-card">
          <h3>{recentRestaurants.length}</h3>
          <p>Restaurants Added</p>
        </div>
        {topCities.map((c, i) => (
          <div className="stat-card" key={i}>
            <h3>{c.count}</h3>
            <p>New in {c.city}</p>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <h4>📅 Daily Additions</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyCounts}>
          <XAxis
            dataKey="date"
            tick={{ fill: "white" }}
            axisLine={{ stroke: "white" }}
            tickLine={{ stroke: "white" }}
          />
            <YAxis
              tick={{ fill: "white" }}
              axisLine={{ stroke: "white" }}
              tickLine={{ stroke: "white" }}
            />
            <Tooltip />
            <Bar dataKey="count" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>
      </>
  );
};

export default AdminAnalytics;
