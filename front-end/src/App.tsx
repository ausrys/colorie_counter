import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./pages/Product";
import Home from "./pages/Home";
import MealCreate from "./pages/MealCreate";
import Meal from "./pages/Meal";
import Meals from "./pages/Meals";
import Portion from "./pages/Portion";
import store from "./store";
import Statistics from "./pages/Statistics";
import { CWSLoader } from "./components/Statistics/CurrentWeekStatistics";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import NotFoundPage from "./pages/NotFoundPage";
import AdminRoute from "./components/Routes/AdminRoute";
import { categoriesLoader } from "./components/Product/categoriesLoader";
function App() {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="" element={<AdminRoute />}>
            <Route
              path="/products/add"
              element={<Products />}
              loader={categoriesLoader}
            />
          </Route>
          <Route path="/meals" element={<Meals />} />
          <Route path="/meals/meal/:meal_id" element={<Meal />} />
          <Route path="/meals/meal/create/" element={<MealCreate />} />
          <Route path="/meals/meal/portion/:meal_id" element={<Portion />} />
          <Route
            path="/statistics"
            element={<Statistics />}
            loader={CWSLoader}
          />
          <Route />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" errorElement={<NotFoundPage />} />
      </Route>
    )
  );
  return (
    <div className="App bg-slate-100 flex-1">
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
