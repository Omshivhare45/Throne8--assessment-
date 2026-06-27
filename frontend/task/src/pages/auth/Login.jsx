import { Link } from "react-router-dom";
import video from "../../assets/video.mp4";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth.api";
import useAuthStore from "../../store/authStore";

const Login = () => {

    const navigate = useNavigate();
    const { setAuth } = useAuthStore();
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await login(formData);

            console.log(res.data);

            alert("Login Successful");

            setAuth(
                res.data.user,
                res.data.accessToken
            );
            navigate("/admin");
        }catch(err){
            console.log("STATUS:", err.response?.status);

    console.log("DATA:", err.response?.data);

    console.log("FULL ERROR:", err);


            alert(err.response?.data?.message || "Login Failed");
        }
    }

  return (

    <div className="auth-container">

    

      <div className="auth-left">

        <h1 className="auth-logo">
          Throne<span>8</span>
        </h1>

        <h2 className="hero-heading">
          Engineering
          <br />
          Tomorrow's
          <br />
          Digital Future.
        </h2>

        <p className="hero-text">
          We build enterprise software, AI solutions and scalable
          digital products for startups, businesses and governments.
        </p>

        <div className="hero-image">
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            />
        </div>

      </div>



      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back</h2>

          <p className="auth-line">
            Login to access the Admin Dashboard
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email" name="email"
                placeholder="Enter your email" value={formData.email} onChange={handleChange} required
              />
            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>

            <button className="auth-btn" type="submit">
              Login
            </button>

          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            Continue with Google
          </button>

          <p className="auth-footer">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;