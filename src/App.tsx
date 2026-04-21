import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { PrivateRoute } from "./utils/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Sessions from "./pages/Sessions";
import MasterPanel from "./pages/master/MasterPanel";
import ManageSessions from "./pages/master/ManageSessions";
import SessionsEditorV2 from "./pages/master/SessionsEditor";
import SessionInfo from "./pages/Session";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { RoleGuard } from "./utils/RoleGuard";
import Characters from "./pages/characters/Characters";
 
import Users from "./pages/master/Users";
import CharacterEditor from "./pages/characters/CharacterEditor";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionInfo />} />

            <Route
              path="/characters"
              element={
                <PrivateRoute>
                  <Characters />
                </PrivateRoute>
              }
            />

            <Route
              path="/characters/:id"
              element={
                <PrivateRoute>
                  <CharacterEditor />
                </PrivateRoute>
              }
            />

            <Route
              path="/manage/sessions"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <ManageSessions />
                  </RoleGuard>
                </PrivateRoute>
              }
            />
            <Route
              path="/manage/sessions/:id"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <SessionsEditorV2 mode="edit" />
                  </RoleGuard>
                </PrivateRoute>
              }
            />
            <Route
              path="/manage/sessions/new"
              element={
                <RoleGuard
                  allowedRoles={["master"]}
                  fallback={<UnauthorizedPage />}
                >
                  <SessionsEditorV2 mode="create" />
                </RoleGuard>
              }
            />

            <Route
              path="/manage"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <MasterPanel />
                  </RoleGuard>
                </PrivateRoute>
              }
            />

            <Route
              path="/manage/users"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <Users />
                  </RoleGuard>
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
