import AppRoutes from "./presenters/routes";
import { BrowserRouter } from "react-router-dom";
import validateEnv from "./utils/validateEnv";
import "./App.css";

const App = () => {
  validateEnv();

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
