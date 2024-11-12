import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import Loader from "./components/Loader/Loader";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Router>
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Login setLoading={setLoading} />} />
          <Route path="/SignUp" element={<SignUp setLoading={setLoading} />} />
          <Route path="/Dashboard/*" element={<ProtectedRoute component={Dashboard} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
