import "./Hero.css";
import img from "../../assets/images.jpg";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="hero-tag">
          Enterprise Software • AI • Cloud
        </span>

        <h1 className="hero-title">
          Building Digital
          <br />
          Products That Scale.
        </h1>

        <p className="hero-description">
          We help startups, enterprises and government organizations
          build scalable software, AI solutions and digital products
          that create real business impact.
        </p>

        <div className="hero-buttons">

          <button className="hero-btn primary-btn">
            Book Consultation
          </button>

          <button className="hero-btn secondary-btn">
            View Portfolio
          </button>

        </div>

      </div>

      <div className="hero-image">
        <img src={img} alt="Hero" />
      </div>

    </section>
  );
};

export default Hero;