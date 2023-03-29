import { MealInfoType, MealProducts } from "../../types/productTypes";
import MealProductsList from "./MealProductsList";

type Props = {}

const MealInfo = (props: any) => {
    const {createdAt, title,  Products, isPortion, ...rest} = props.data;
    const mealInfo : MealInfoType = {...rest};
  return (
    <div>
        <h1>{title}</h1>
            <div>{Object.entries(mealInfo).map(([key, value], mapkey) => {
                return <h4 key={mapkey}>{key}: {value}</h4>
            })}
            </div>
            <MealProductsList products = {Products}/>
        </div>
  )
}

export default MealInfo