import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Products from './pages/Products';
import Home from './pages/Home';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MealCreate from './pages/MealCreate';
import Meal from './pages/Meal';
import Meals from './pages/Meals';
import Portion from './pages/Portion';
function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Link to={'/'}>Home</Link>
          <Link to={'/products'}>Products</Link>
          <Link to={'/meals'}>Meals</Link>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/meals" element={<Meals/>} />
            <Route path="/meals/meal/:meal_id" element={<Meal/>} />
            <Route path="/meals/meal/create/" element={<MealCreate/>} />
            <Route path="/meals/meal/portion/:meal_id" element={<Portion/>} />
          </Routes>
        </Router>

      </QueryClientProvider>

    </div>
  )
}

export default App
