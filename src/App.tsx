import { Route, Routes } from "react-router";
import { Suspense } from "react";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { authRoutes, routes } from "./routes";
import { LoadingScreen } from "./components/layouts/LoadingScreen";

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
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
    </Suspense>
  );
}

export default App;
