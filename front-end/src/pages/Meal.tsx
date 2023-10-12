import { useLoaderData, useParams, NavLink } from "react-router-dom";
import MealInfo from "../components/Meal/MealInfo";
import MealProductsList from "../components/Meal/MealProductsList";
import { mealInfoData } from "../types/mealTypes";

const Meal = () => {
  const data = useLoaderData() as mealInfoData;
  const { meal_id } = useParams();
  return (
    <section className="">
      {data?.isPortion === false ? (
        <NavLink
          to={`/meals/meal/portion/${meal_id}`}
          className={
            "bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 rounded-md py-2 px-2 ml-auto my-auto"
          }
        >
          Portion the meal
        </NavLink>
      ) : null}
      <div className="flex h-80">
        <MealInfo />
      </div>
      <MealProductsList isRemovable={false} title={`${data?.title} products`} />
    </section>
  );
};

export default Meal;
