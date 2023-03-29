import { useNavigate } from "react-router-dom"
import { useFetchData } from "../hooks/axiosHooks"

type Props = {}

const Meals = (props: Props) => {
    const {data, isLoading, error} = useFetchData('meals', '/meals')
    const navigate = useNavigate();
    if(isLoading) return <h1>Loading..</h1>
  return (
    <div>
        {data.map((obj: any, key: any) => {
            return (
                <div onClick={() => navigate(`/meals/meal/${obj.meal_id}`) } style={{cursor: 'pointer'}} key={key}>
                    <h3>{obj.title}</h3>
                    <h4>{obj.createdAt}</h4>
                </div>
            )
                
        })}
    </div>
  )
}

export default Meals