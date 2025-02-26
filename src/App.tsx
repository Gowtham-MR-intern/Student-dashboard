import { Route, Routes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Login from './pages/Login'

function App() {
  return (
    <>
      
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
}

export default App;
