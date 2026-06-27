import { Link } from "react-router-dom";
import video from "../../assets/video.mp4";
import "./Login.css";

const Login = () => {
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
          
        </div>

      </div>



      <div className="auth-right">

        <div className="auth-card">

          <h2>Welcome Back</h2>

          <p className="auth-line">
            Login to access the Admin Dashboard
          </p>

          <form className="auth-form">

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
              />

            </div>

            <button className="auth-btn">
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