import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./services/ProtectedRoute";
import Dashboard from "./pages/Dashboard"
import Login from './pages/Login'
import Settings from "./pages/Settings";
import Ecommerce from "./pages/Ecommerce";
import Home from "./pages/Home";
import Products from "./components/Products";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryclient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryclient}>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/ecommerce/:category" element={<Products />} />
          </Route>
          
        </Routes>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
