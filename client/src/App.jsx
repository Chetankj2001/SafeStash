import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//import all components
import Pagenotfound from "./components/pagenotfound";
import Password from "./components/password";
import Profile from "./components/profile";
import Recovery from "./components/recovery";
import Register from "./components/register";
import Reset from "./components/reset";
import Username from "./components/username";

//Auth middleware
import AuthorizeUser from "./middleware/auth.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/*", //if anything not found it redirect to this page
    element: <Pagenotfound />,
  },
  {
    path: "/Password",
    element: <Password />,
  },
  {
    path: "/Profile",
    element: (
      <AuthorizeUser>
        <Profile />
      </AuthorizeUser>
    ),
  },
  {
    path: "/Recovery",
    element: <Recovery />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Reset",
    element: <Reset />,
  },
]);
function App() {
  return (
    <div>
      <RouterProvider router={route}></RouterProvider>
    </div>
  );
}
export default App;
