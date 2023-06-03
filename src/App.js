import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Certification from './components/Map';
import Experiences from './components/Restaurant';
import Formations from './components/Zone';
import Projets from "./components/projets"
import Accueil from "./components/ville"
import AddRestaurant from './components/AddRestaurant';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <BrowserRouter>
      <div>
       
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
              ville
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Zone" className="nav-link">
               Zone
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Restaurant" className="nav-link">
                Restaurant
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/Map" className="nav-link">
                Map
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/AddRestaurant" className="nav-link">
               AjoutRestaurant
              </Link>
            </li>
           
            
          </ul>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<Accueil />} />
            <Route path="/Zone" element={<Formations />} />
            <Route path="/Restaurant" element={<Experiences />} />
            <Route path="/AddRestaurant" element={<Projets />} />
            <Route path="/Map" element={<Certification />} />

          </Routes>
        </div>

       
      </div>
    </BrowserRouter>
  );
}


export default App;