import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { CharacterForm } from "./pages/characters/render/SchemaRender";
import Reg from "./pages/Reg";
import CharacterSchemas from "./pages/master/SystemSchemaEditor/CharacterSchemas";
import CharacterSchemasEditor from "./pages/master/SystemSchemaEditor/CharacterSchemasEditor";
import ToolsMainPage from "./pages/tools/ToolsMainPage";
import ChapterView from "./pages/tools/dnd-guild/rules/ChapterView";
import City from "./pages/tools/dnd-guild/City/City";
import GuildMainPage from "./pages/tools/dnd-guild/GuildMainPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Sessions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reg" element={<Reg />} />

            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:id" element={<SessionInfo />} />
            <Route path="/tools" element={<ToolsMainPage />} />

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
                  <CharacterForm />
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

            <Route
              path="/manage/schemas"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <CharacterSchemas />
                  </RoleGuard>
                </PrivateRoute>
              }
            />

            <Route
              path="/manage/schemas/:id"
              element={
                <PrivateRoute>
                  <RoleGuard
                    allowedRoles={["master"]}
                    fallback={<UnauthorizedPage />}
                  >
                    <CharacterSchemasEditor />
                  </RoleGuard>
                </PrivateRoute>
              }
            />

            <Route path="/tools" element={<ToolsMainPage />} />
            <Route path="/tools/guild" element={<GuildMainPage />} />
            <Route path="/tools/guild/rules" element={<ChapterView />} />
            <Route path="/tools/guild/rules/:id" element={<ChapterView />} />
            <Route path="/tools/guild/city" element={<City />} />

            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
