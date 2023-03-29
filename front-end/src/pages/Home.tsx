import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MealType } from "../types/enums";
type Props = {}

const Home = (props: Props) => {
    const navigate = useNavigate();
    const mutation = useMutation({
      mutationFn: (newMeal: MealType) => {
        return axios.post('http://localhost:5000/meals/meal/create', {title: newMeal})
      },
      onSuccess: (data: any) => {
        navigate(`/meals/meal/create/${data.data?.meal_id}`)
      },
    })
    if(mutation.error) console.log(mutation.error)
  return (
    <div >
      <h1>Create the meal: </h1>
      <div style={{display: "flex", justifyContent: "center"}}>
      {Object.values(MealType).map((mealType, key) => (
        <div key={key} onClick={() => mutation.mutate( mealType)} style={{height: 30, width: "auto", margin: 25, cursor: "pointer"}}>
            <h3 style={{margin: 0}}>{mealType}</h3>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Home