import { useState } from "react";
import api from "../../../api/api";
import "./Registration.scss";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/register", formData);
      setMessage("Registration is successful");
      console.log("Server response:", response.data);
    } catch (error) {
      setMessage(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error:", error);
    }
  };

  return (
    <div className="reg-page">
      <div className="form-container">
        <h2 className="title">REGISTRATION</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            SING UP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Registration;
