import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import api from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import "../registration/Registration.scss";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", formData);
      setMessage("login is successful");
      console.log("Server response:", response.data);

      login();
      navigate("/profile");
    } catch (error) {
      setMessage(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
      console.error("Error:", error);
    }
  };
  return (
    <>
        <div className="reg-page">
          <div className="form-container">
            <h2 className="title">Login</h2>
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
                Log in
              </button>
            </form>
          </div>
        </div>
    </>
  );
}

export default Login;
