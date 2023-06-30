import { useNavigate, useParams } from "react-router-dom";
import MealInfo from "../components/Meal/MealInfo";
import { useFetchData } from "../hooks/axiosHooks";
import MealProductsList from "../components/Meal/MealProductsList";
import Button from "../components/Reusable Components/Button";
import { useDispatch } from "react-redux";
import { setMealInfo } from "../reducers/mealReducers/mealInfoReducer";

type Props = {};

const Meal = (props: Props) => {
  const { meal_id } = useParams();
  if (!meal_id) return <h2>Provide a Meal</h2>;
  const { data, isLoading, error } = useFetchData(
    ["mealget", meal_id],
    `/meals/meal/${meal_id}`
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (isLoading) return <h1>Loading...</h1>;
  if (data) {
    const { title, calories, carbs, weight, protein, prodsInfo, isPortion } =
      data;
    return (
      <div className="">
        <h1>{title}</h1>
        <div className="flex h-80">
          <MealInfo
            mealInfo={{ calories, carbs, protein, weight }}
            prodsInfoLength={prodsInfo.length}
          />
          {isPortion === false ? (
            <Button
              onClick={() => {
                navigate(`/meals/meal/portion/${meal_id}`);
                dispatch(setMealInfo(data));
              }}
            >
              Portion the meal
            </Button>
          ) : null}
        </div>
        <MealProductsList
          isListItemsRemovable={false}
          prodsInfo={prodsInfo}
          title={`${title} products`}
        />
      </div>
    );
  } else return <h1>Meal was not found</h1>;
};

export default Meal;
