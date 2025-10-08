import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function BookStation() {
  const [user, setUser] = useState(null);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  // Get logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
    });
  }, []);

  // Fetch stations
  useEffect(() => {
    const fetchStations = async () => {
      const { data, error } = await supabase.from("stations").select("*");
      if (error) console.error(error);
      else setStations(data);
    };
    fetchStations();
  }, []);

  // Fetch user bookings
  const fetchUserBookings = async (userId) => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*, stations(name)")
      .eq("user_id", userId)
      .order("start_time", { ascending: false });

    if (error) console.error(error);
    else setBookings(data);
  };

  useEffect(() => {
    if (user) fetchUserBookings(user.id);
  }, [user]);

  // Handle booking
  const handleBook = async () => {
    if (!user) {
      alert("Please log in first!");
      return;
    }
    if (!selectedStation || !startTime) {
      alert("Please select a station and time!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("bookings").insert([
      {
        user_id: user.id,
        station_id: selectedStation,
        start_time: startTime,
        status: "booked",
      },
    ]);
    setLoading(false);

    if (error) alert("Booking failed: " + error.message);
    else {
      alert("✅ Booking successful!");
      fetchUserBookings(user.id); // refresh bookings list
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Book a Charging Slot</h2>

      {!user ? (
        <p>Please log in to book a station.</p>
      ) : (
        <>
          <label>Choose Station:</label>
          <select
            onChange={(e) => setSelectedStation(e.target.value)}
            value={selectedStation}
          >
            <option value="">-- Select Station --</option>
            {stations.map((s) => (
              <option key={s.station_id} value={s.station_id}>
                {s.name} ({s.available_connectors}/{s.total_connectors})
              </option>
            ))}
          </select>

          <label>Start Time:</label>
          <input
            type="datetime-local"
            onChange={(e) => setStartTime(e.target.value)}
          />

          <button onClick={handleBook} disabled={loading}>
            {loading ? "Booking..." : "Book Now"}
          </button>

          <hr />
          <h3>Your Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul>
              {bookings.map((b) => (
                <li key={b.booking_id}>
                  <b>{b.stations?.name}</b> —{" "}
                  {new Date(b.start_time).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
