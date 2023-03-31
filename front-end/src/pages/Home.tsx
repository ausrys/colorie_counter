import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MealType } from "../types/enums";
type Props = {}

const Home = (props: Props) => {
    const navigate = useNavigate();
        

  return (
    <div >
      <h1>Create the meal: </h1>
      <div style={{display: "flex", justifyContent: "center"}}>
      {Object.values(MealType).map((mealType, key) => (
        <div key={key} onClick={() => navigate(`/meals/meal/create/`)} style={{height: 30, width: "auto", margin: 25, cursor: "pointer"}}>
            <h3 style={{margin: 0}}>{mealType}</h3>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Home