import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import ValidateEmail from "../pages/ValidateEmail/ValidateEmail";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

export const router = createBrowserRouter([
  {
    path: "/registro/validar",
    element: <ValidateEmail />,
  },
  {
    path: "/registro/verificar",
    element: <VerifyEmail />,
  },
  {
    path: "/registro/formulario",
    element: <Register />,
  },
]);
