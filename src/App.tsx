import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route
            path="/sessions"
            element={
              <ProtectedRoute allowedRoles="player">
                <h1>ухты</h1>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
