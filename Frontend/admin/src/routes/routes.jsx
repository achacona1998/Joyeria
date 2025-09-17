import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Error } from "../pages/Error/error";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import ActivarCuenta from "../pages/Auth/ActivateAccount";
import Productos from "../pages/Productos/Productos";

export default function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/*Auth Display*/}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/activate/:uid/:token" element={<ActivarCuenta />} />

        {/*Dashboard Display*/}
        <Route path="/dashboard" element={<Dashboard />} />
        {/*Products Display*/}
        <Route path="/productos" element={<Productos />} />
        {/*Error Display*/}
        <Route path="*" element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}
