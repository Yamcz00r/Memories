import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
function App() {
  const router = createBrowserRouter([
    {
      element: <Home />,
      path: "/",
    },
    {
      element: <Login />,
      path: "/login",
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
