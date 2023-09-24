import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Authenticated, PreventReLogin } from "./components/Authenticated";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        // <Authenticated>
        <Home />
        // </Authenticated>
      ),
    },
    {
      path: "/login",
      element: (
        <PreventReLogin>
          <Login />
        </PreventReLogin>
      ),
    },
  ]);

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
