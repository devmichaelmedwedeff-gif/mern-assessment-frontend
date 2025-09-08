import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import List from "./pages/List/List";
import Settings from "./pages/Setting/Settings";
import Create from "./pages/List/Create";
import Update from "./pages/List/Update";
import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register/Register";

// Simple auth wrapper
// const PrivateRoute = ({ children }) => {
//   const isAuth = localStorage.getItem("auth") === "true";
//   return isAuth ? children : <Navigate to="/login" />;
// };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>

        {/* Private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/list" element={<List />} />
          <Route path="/list/create" element={<Create />} />
          <Route path="/list/update/:id" element={<Update />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        {/* Private route */}

        {/* Redirect all unknown paths */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
