import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./HomePage.css";
function HomePage() {
  return (
    <div className="home-page">
      <header>
        <h1>TEKNOLOJİK YEMEKLER</h1>
      </header>
      <section>
        <p className="subtitle">KOD ACIKTIRIR</p>
        <p className="subtitle">PIZZA, DOYURUR</p>
        <Link to="/order-pizza" className="home-button">
          ACIKTIM
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
