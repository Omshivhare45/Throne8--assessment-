import { Link, useNavigate } from "react-router-dom";
import { register } from '../../api/auth.api';
import { useState } from "react";
import "./Login.css";

const Register = () => {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {

        const res = await register({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });

        alert("🎉 Registration Successful!");

        navigate("/login");

    } catch (err) {

        alert(err.response?.data?.message || "Registration Failed");

    }

};
  return (
    <div className="auth-container">

      

      <div className="auth-left">

        <h1 className="auth-logo">
          Throne<span>8</span>
        </h1>

        <h2 className="hero-heading">
          Join Our
          <br />
          Admin
          <br />
          Portal.
        </h2>

        <p className="hero-text">
          Create an administrator account to manage blogs,
          projects, careers, leads, testimonials and more.
        </p>

        <div className="hero-image">

        </div>

      </div>

      <div className="auth-right">

        <div className="auth-card">

          <h2>Create Account</h2>

          <p className="auth-line">
            Register to access the Admin Dashboard
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text" name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text" name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email" name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password" name="password"
                placeholder="Create a password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password" name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="auth-btn" type="submit">
              Create Account
            </button>

            

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            Continue with Google
          </button>

          <p className="auth-footer">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;