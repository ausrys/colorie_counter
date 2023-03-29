import { useNavigate, useParams } from "react-router-dom";
import MealInfo from "../components/Meal/MealInfo";
import { useFetchData } from "../hooks/axiosHooks";

type Props = {}

const Meal = (props: Props) => {
    const {meal_id} = useParams();
    const {data, isLoading, error} = useFetchData('mealget', `/meals/meal/${meal_id}`);
    const navigate = useNavigate();
    if(isLoading) return <h1>Loading...</h1>
    if(!data) return <h1>Meal was not found</h1>
    return (
    <div>
      <MealInfo data = {data}/>
      <button onClick={() => {
        navigate(`/meals/meal/portion/${meal_id}`)
      }}>Portion the meal</button>
    </div>
  )
}

export default Meal