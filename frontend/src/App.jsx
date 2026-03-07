import "./App.css";
import AllRoutes from "./Router/AllRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Define the paths where the Navbar and Footer should be HIDDEN
  const restrictedPaths = [
    "/login",
    "/register-user",
    "/admin-login",
    "/admin/admin"
  ];

  // Helper function to check if the current path matches any restricted path
  // We use .some() to check if current path starts with or equals any restricted path
  const isRestrictedPath = restrictedPaths.some(path => {
    // Exact match or starting with the path (to handle sub-routes if needed)
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  });

  return (
    <div>
      {!isRestrictedPath && <Navbar />}
      <div style={{ minHeight: "90vh" }}>
        <AllRoutes />
      </div>
      {!isRestrictedPath && <Footer />}
    </div>
  );

}
export default App;
