import { useLoaderData, useNavigate } from "react-router-dom";
import { mealInfoData } from "../types/mealTypes";

const Meals = () => {
  const data = useLoaderData() as mealInfoData[];
  const navigate = useNavigate();
  return (
    <div className=" flex flex-col flex-1 items-center">
      {data.map((obj: mealInfoData) => {
        return (
          <div
            onClick={() => navigate(`/meals/meal/${obj.meal_id}`)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "auto",
            }}
            key={obj.meal_id}
          >
            <h3 style={{ margin: 10 }}>{obj.title}</h3>
            <h4 style={{ margin: 10 }}>{obj.createdAt}</h4>
            <h3 style={{ margin: 10 }}>
              Can be portioned: {obj.isPortion === true ? "no" : "yes"}
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default Meals;
