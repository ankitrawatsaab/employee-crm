import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import FaceRegistration from "./components/FaceRegistration";
import FaceVerification from "./components/FaceVerification";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/face-registration",
    element: <FaceRegistration />,
  },
  {
  path: "/face-verification",
  element: <FaceVerification />,
}
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App