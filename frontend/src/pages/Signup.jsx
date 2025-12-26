import React from "react";

export default function Signup() {
  return (
    <div style={{ maxWidth: 420, margin: "80px auto" }}>
      <h2>Create your account</h2>

      <input placeholder="Full Name" style={{ width: "100%", margin: 8, padding: 10 }} />
      <input placeholder="Email" style={{ width: "100%", margin: 8, padding: 10 }} />
      <input type="password" placeholder="Password" style={{ width: "100%", margin: 8, padding: 10 }} />

      <button style={{ width: "100%", padding: 12, marginTop: 12 }}>
        Sign up
      </button>
    </div>
  );
}
