import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
function App() {
  const router = createBrowserRouter([
    {
      element: <Login />,
      path: "/",
    },
    {
      element: <Home />,
      path: "/home",
    },
    {
      element: <Signup />,
      path: "/signup"
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
