import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand>OctoFit Tracker</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <h1>Welcome to OctoFit Tracker</h1>
        <p>React 19 + Vite frontend initialized.</p>
      </Container>
    </>
  );
}

export default App;
