import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root/root";
import CreateMeal from "./routes/createMeal/createMeal";
import Edit from "./routes/edit/edit";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <p>Creio que essa página não exista...</p>,
    element: <Root />,
  },
  {
    path: "/createMeal",
    element: <CreateMeal />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
