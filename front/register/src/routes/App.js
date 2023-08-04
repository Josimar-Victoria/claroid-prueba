/* import { createBrowserRouter } from "react-router-dom"; */
import Register from "../pages/Register/Register";
import ValidateEmail from "../pages/ValidateEmail/ValidateEmail";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
/*  */
/* export const router = createBrowserRouter([ */
/*   { */
/*     path: "/registro/validar", */
/*     element: <ValidateEmail />, */
/*   }, */
/*   { */
/*     path: "/registro/verificar", */
/*     element: <VerifyEmail />, */
/*   }, */
/*   { */
/*     path: "/registro/formulario", */
/*     element: <Register />, */
/*   }, */
/* ]); */

import { BrowserRouter, Route, Routes } from "react-router-dom";

/* export default function App() { */
/*   return ( */
/*     <Routes> */
{/*       <Route path="/" render={() => <ValidateEmail />} /> */}
{/*       <Route path="/verificar" element={<VerifyEmail/>} /> */}
{/*       <Route path="/formulario" element={<Register/>} /> */}
{/*     </Routes> */}
/*   ); */
/* } */


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VerifyEmail/>}/> {/* 👈 Renders at /app/ */}
        <Route path="/verificar" element={<ValidateEmail/>}/>
        <Route path="/formulario" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}