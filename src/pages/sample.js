import { useState, useEffect } from "react";

export default function AddDish() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ID, setID] = useState("");

  async function handleSave() {
    const postData = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password }),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/sampleapi`,
      postData
    );
  }

  async function handleCommit() {
    const postData = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: name, password: password }),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/sampleapi`,
      postData
    );
    const res = response.json();
    console.log(res);
  }

  return (
    <div>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleCommit}>
        Commit
      </button>
    </div>
  );
}
