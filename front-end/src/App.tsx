import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./pages/Products";
import Home from "./pages/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MealCreate from "./pages/MealCreate";
import Meal from "./pages/Meal";
import Meals from "./pages/Meals";
import Portion from "./pages/Portion";
import Navbar from "./components/Navbar/Navbar";
import store from "./store";
import Statistics from "./pages/Statistics";
import { CWSLoader } from "./components/Statistics/CurrentWeekStatistics";
import Layout from "./components/Layout/Layout";
function App() {
  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/meal/:meal_id" element={<Meal />} />
        <Route path="/meals/meal/create/" element={<MealCreate />} />
        <Route path="/meals/meal/portion/:meal_id" element={<Portion />} />
        <Route path="/statistics" element={<Statistics />} loader={CWSLoader} />
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
