"use client";

import { useState } from "react";

export default function Page() {
  const [scramble, setScramble] = useState("");
  const [result, setResult] = useState([]);

  async function onSearch() {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scramble }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cari Kota dari Scramble</h1>

      <input
        value={scramble}
        onChange={(e) => setScramble(e.target.value)}
        placeholder="Masukkan scramble..."
        style={{ padding: 8, width: 250 }}
      />

      <button onClick={onSearch} style={{ marginLeft: 10, padding: "8px 12px" }}>
        Cari
      </button>

      <div style={{ marginTop: 20 }}>
        {result.map((city: any, i: number) => (
          <div key={i}>
            {city.original} ({city.region})
          </div>
        ))}
      </div>
    </div>
  );
}
