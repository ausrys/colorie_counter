import { useSelector } from "react-redux";
import Button from "../Reusable Components/Button";

type Props = {};
const MealCreateButtonsSection = (props: any) => {
  const mealProducts = useSelector((state: any) => state.mealInfo.mealProducts);
  return (
    <div className="w-1/5">
      {props.isPortion === 0 ? (
        // Set the portion of the meal, 1 - the whole meal was eater, 0 - meal wasn't eaten as a whole, only a portion of it
        <Button size={"lg"} onClick={() => props.setIsPortion(1)}>
          Full Portion
        </Button>
      ) : null}
      {/* Save the meal only if there is atleast one product */}
      {mealProducts.length > 0 ? (
        <Button size={"lg"} onClick={() => props.handleSaveMeal()}>
          Save the meal
        </Button>
      ) : null}
    </div>
  );
};
export default MealCreateButtonsSection;
