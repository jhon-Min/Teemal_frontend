import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Home } from "./pages/Home";
import { useSelector } from "react-redux";
import { User } from "./pages/user/User";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="users" element={<User />} />
    </Route>
  )
);

function App() {
  const { accessToken } = useSelector((state) => state.user);
  if (!accessToken) {
    return <Login />;
  }
  return <RouterProvider router={router} />;
}

export default App;
