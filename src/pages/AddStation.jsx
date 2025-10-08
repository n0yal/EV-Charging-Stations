import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AddStation() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);

  const handleAdd = async () => {
    const { error } = await supabase
      .from("stations")
      .insert([{ name, address, total_connectors: total, available_connectors: total }]);
    if (error) alert("Failed to add station");
    else alert("Station added!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Add New Charging Station (Admin)</h2>
      <input placeholder="Station Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
      <input type="number" placeholder="Total Connectors" onChange={(e) => setTotal(e.target.value)} />
      <button onClick={handleAdd}>Add Station</button>
    </div>
  );
}