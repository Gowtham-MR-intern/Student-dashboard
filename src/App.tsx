import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./pages/Dashboard"
import Login from './pages/Login'
import DataTable from "./components/Table";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route  path="/dashboard" element={<Dashboard />}>
              <Route index element={<DataTable />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

        </Routes>
    </AuthProvider>
  
  );
}

export default App;
