import { Route, Routes, useNavigate } from "react-router-dom";
import ShowSummary from "./components/ShowSummary";
import ShowList from "./components/Showlist";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="hero-title-wrapper" style={{ cursor: "pointer" }}>
        <h1 className="hero-title" onClick={() => navigate("/")}>
          TV Shows
        </h1>
      </div>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/summary/:showId" element={<ShowSummary />} />
      </Routes>
    </div>
  );
}

export default App;
