import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./pages/NewProduct";
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
import AdminRoute from "./components/Routes/AdminRoute";
import { categoriesLoader } from "./components/Product/categoriesLoader";
import {
  adminChechLoader,
  mealInfoLoader,
  mealsLoader,
} from "./helper/routesLoaders";
import PageError from "./pages/PageError";
function App() {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        element={<Layout />}
        errorElement={<PageError error="Page Not Found" />}
      >
        <Route path="" element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="" element={<AdminRoute />}>
            <Route
              path="/products/add"
              element={<Products />}
              loader={categoriesLoader}
              errorElement={<PageError error="Page not found" />}
            />
          </Route>
          <Route path="/meals" element={<Meals />} loader={mealsLoader} />
          <Route
            path="/meals/meal/:meal_id"
            element={<Meal />}
            loader={mealInfoLoader}
            errorElement={<PageError error="Meal was not found" />}
          />
          <Route path="/meals/meal/create/" element={<MealCreate />} />
          <Route
            path="/meals/meal/portion/:meal_id"
            loader={mealInfoLoader}
            element={<Portion />}
            errorElement={<PageError error="Meal was not found" />}
          />
          <Route
            path="/statistics"
            element={<Statistics />}
            loader={CWSLoader}
          />
          <Route />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );
  return (
    <div className="App ">
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
