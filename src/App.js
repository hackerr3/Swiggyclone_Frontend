import React, { useState } from "react";
import { validateForm } from "./formValidation"; // Import validateForm function
import axios from "axios";
import "./App.css";

const images = [
  "https://raw.githubusercontent.com/hackerr3/imazes/master/1.jpeg",
  "https://raw.githubusercontent.com/hackerr3/RestarentImazes/master/Swiggywelcomepaze/imaze2.jpeg",
  "https://raw.githubusercontent.com/hackerr3/RestarentImazes/master/Swiggywelcomepaze/imaze3.jpeg",
];

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    mobile: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({}); // To store error messages
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the specific error when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // This will clear the specific error related to the input field
    }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim mobile number to avoid spaces
    const trimmedMobile = formData.mobile.trim();

    if (trimmedMobile === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobile: "Mobile number is required",
      }));
      return;
    }

    const updatedFormData = { ...formData, mobile: trimmedMobile };

    // Validate form and get all errors at once
    const formErrors = validateForm(updatedFormData);

    // If there are any errors, set them and stop form submission
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, proceed with form submission
    try {
      const response = await axios.post(
        "http://localhost:8084/api/v1/customers/register",
        updatedFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Registration successful!");
      setMessageType("success");

      // Show popup for success
      alert("Registration Successful!");

      // Clear the form and errors after success
      resetFormData();

      console.log(response.data);
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response);
        setMessage(`Error ${error.response.status}: ${error.response.data || "Registration failed"}`);
        setMessageType("error");

        // Show popup for error
        alert(`Registration Failed! Error: ${error.response.status}`);
      } else {
        setMessage("An error occurred. Please try again.");
        setMessageType("error");

        // Show popup for error
        alert("An error occurred. Please try again.");
      }
    }
  };

  // Reset form data and errors
  const resetFormData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      mobile: "",
      password: "",
      username: "",
    });
    setErrors({});
  };

  return (
    <div className="container">
      <div
        className="background-slider"
        style={{
          backgroundImage: `url(${images[0]})`, // Add your logic for image rotation here if needed
        }}
      ></div>

      <div className="sign-in-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                placeholder="Enter your country"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && <span className="error">{errors.mobile}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Register
          </button>
        </form>

        {message && (
          <p className={`message ${messageType}`}>{message}</p>
        )}

        <div className="login-message">
          Already have an account? <a href="#login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default App;
