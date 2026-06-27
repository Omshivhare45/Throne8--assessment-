import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <section
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
        }}
      >
        Hero Section
      </section>
    </>
  );
};

export default Home;