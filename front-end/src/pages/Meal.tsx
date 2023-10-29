import { useLoaderData, useParams, NavLink } from "react-router-dom";
import MealInfo from "../components/Meal/MealInfo";
import MealProductsList from "../components/Meal/MealProductsList";
import { mealInfoData } from "../types/mealTypes";

const Meal = () => {
  const data = useLoaderData() as mealInfoData;
  return (
    <section className="mx-16">
      <h1 className="text-5xl font-bold my-10">{data.title}</h1>

      <div className="flex flex-row">
        <MealInfo />

        {data?.isPortion === false ? (
          <NavLink
            to={`/meals/meal/portion/${data.meal_id}`}
            className={
              "bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 rounded-md py-2 px-2 mt-6"
            }
          >
            Portion the meal
          </NavLink>
        ) : null}
      </div>
      <MealProductsList isRemovable={false} title={`${data?.title} products`} />
    </section>
  );
};

export default Meal;
