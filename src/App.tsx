import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./utils/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import Sessions from "./pages/Sessions/Sessions";
import MasterPanel from "./pages/master/MasterPanel";
import ManageSessions from "./pages/master/ManageSessions";
import SessionsEditorV2 from "./pages/master/SessionsEditor";
import SessionInfo from "./pages/Sessions/Session";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { RoleGuard } from "./utils/RoleGuard";
import Characters from "./pages/characters/Characters";

import Users from "./pages/master/Users";
import { CharacterForm } from "./pages/characters/render/SchemaRender";
import Reg from "./pages/Reg";
import CharacterSchemas from "./pages/master/SystemSchemaEditor/CharacterSchemas";
import ToolsMainPage from "./pages/tools/ToolsMainPage";
import City from "./pages/tools/dnd-guild/City/City";
import GuildMainPage from "./pages/tools/dnd-guild/GuildMainPage";
import "antd/dist/reset.css"; // Или 'antd/dist/antd.css' для старой версии
import { ConfigProvider, App as AppAntD } from "antd";
import MainPage from "./pages/MainPage";

import React from "react";

const CharacterSchemasEditor = React.lazy(
  () => import("./pages/master/SystemSchemaEditor/CharacterSchemasEditor"),
);

const WikiPage = React.lazy(() => import("./pages/tools/wiki/WikiPage"));

const TypewriterTheme = {
  token: {
    fontFamily: '"iA Writer Mono V", "Courier New", Courier, monospace',
    fontFamilyCode: '"iA Writer Mono V", "Courier New", Courier, monospace',

    colorPrimary: "#979795",
    colorSuccess: "#4b7a47",
    colorWarning: "#c99635",
    colorError: "#b04a4a",
    colorInfo: "#4a708b",

    colorText: "#2e2e2e",
    colorTextDescription: "#595959",
    colorBgContainer: "#fcf5e4",
    colorBgLayout: "#f4f4f4",

    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#e8e8e8",

    borderRadius: 2,
    borderRadiusXS: 1,
    borderRadiusSM: 1,
    borderRadiusLG: 4,

    controlOutline: "rgba(0, 0, 0, 0.04)",
    colorBgTextHover: "rgba(0, 0, 0, 0.04)",
    colorBgTextActive: "rgba(0, 0, 0, 0.08)",
  },
  components: {
    Button: {
      // Кнопки делаем более строгими
      borderRadius: 2,
      controlHeight: 34,
      fontFamily: '"iA Writer Mono V", monospace',
    },
    Input: {
      // Поля ввода как на печатной машинке
      borderRadius: 0, // Прямые углы
      colorBgContainer: "#ffffff",
    },
    Typography: {
      // Специфика для текста
      colorText: "#2e2e2e",
    },
    Layout: {
      bodyBg: "#e4dcc8",
      headerBg: "#fcf5e4",
      siderBg: "#fcf5e4",
    },
    Modal: {
      contentBg: "#fcf5e4",
    },
    Select: {
      colorBgContainer: "#fff",
    },
    Tree: {
      indentSize: 12,
      paddingXS: 2,
      fontSize: 16,
    },
  },
};

function App() {
  console.log(TypewriterTheme);
  return (
    <AppAntD>
      <ConfigProvider theme={TypewriterTheme}>
        <BrowserRouter basename="/">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
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
              <Route path="/tools/wiki" element={<WikiPage />} />
              <Route path="/tools/wiki/:id" element={<WikiPage />} />

              <Route path="/tools/guild" element={<GuildMainPage />} />
              <Route path="/tools/guild/city" element={<City />} />

              <Route path="/unauthorized" element={<UnauthorizedPage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </AppAntD>
  );
}

export default App;
