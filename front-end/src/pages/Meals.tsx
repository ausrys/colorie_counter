import { useLoaderData, useNavigate } from "react-router-dom";
import { mealInfoData } from "../types/mealTypes";

const Meals = () => {
  const data = useLoaderData() as mealInfoData[];
  const navigate = useNavigate();

  return (
    <section className="flex-1 bg-blue-100 p-5">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">
        Your created meals
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((obj: mealInfoData) => (
          <div
            onClick={() => navigate(`/meals/meal/${obj.meal_id}`)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow-md"
            key={obj.meal_id}
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {obj.title}
            </h3>
            <p className="text-gray-600 mb-2">{obj.createdAt}</p>
            <h3 className="text-lg text-green-600">
              Can be portioned: {obj.isPortion ? "no" : "yes"}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Meals;
