import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import { apiBaseUrl } from "./api";

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand>OctoFit Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activities">
              Activities
            </Nav.Link>
            <Nav.Link as={NavLink} to="/workouts">
              Workouts
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">
              Leaderboard
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <div className="mb-4">
          <p className="text-secondary">
            API base URL: <code>{apiBaseUrl}</code>
          </p>
          <p>
            Note: set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use
            Codespaces URLs. When unset, the app falls back to <code>http://localhost:8000/api</code>.
          </p>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1>OctoFit Tracker</h1>
                <p>Welcome to the React presentation tier for OctoFit Tracker.</p>
                <p>Select a page in the nav to query the backend API.</p>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
