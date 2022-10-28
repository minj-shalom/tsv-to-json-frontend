import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./Home";

export default function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      window.location.href = "/";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
