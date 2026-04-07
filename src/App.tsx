import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { PrivateRoute } from "./utils/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Sessions from "./pages/Sessions";
import MasterPanel from "./pages/MasterPanel";
import ManageSessions from "./pages/ManageSessions";
import SessionsEditorV2 from "./pages/SessionsEditor";
import SessionInfo from "./pages/Session";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { RoleGuard } from "./utils/RoleGuard";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/sessions" element={<Sessions />} />
            <Route
              path="/sessions/:id"
              element={
                    <SessionInfo />
              }
            />

            <Route
              path="/manage"
              element={
                <PrivateRoute>
                  <MasterPanel />
                </PrivateRoute>
              }
            />

            <Route
              path="/manage/sessions"
              element={
                <PrivateRoute>
                  <ManageSessions />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage/sessions/:id"
              element={
                <PrivateRoute>
                  <SessionsEditorV2 mode="edit" />
                </PrivateRoute>
              }
            />
            <Route
              path="/manage/sessions/new"
              element={
                <PrivateRoute>
                  <SessionsEditorV2 mode="create" />
                </PrivateRoute>
              }
            />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
