import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Stations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      const { data, error } = await supabase.from("stations").select("*");
      if (error) console.error(error);
      else setStations(data);
    };
    fetchStations();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Charging Stations</h2>
      {stations.length === 0 ? (
        <p>No stations found.</p>
      ) : (
        <ul>
          {stations.map((s) => (
            <li key={s.station_id}>
              <b>{s.name}</b> — {s.address} ({s.available_connectors}/{s.total_connectors} available)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}