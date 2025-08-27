import { Route, Routes } from "react-router";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { authRoutes, routes } from "./routes";

function App() {
  return (
    <Routes>
      {/* <Route element={<AuthLayout />}> */}
      {authRoutes.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
      {/* </Route> */}

      {/* Define your routes here */}
      <Route element={<DashboardLayout />}>
        {routes.map((route) => (
          <Route element={route.element} key={route.path} path={route.path} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
