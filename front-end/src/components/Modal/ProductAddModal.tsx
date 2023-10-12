import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProdInfo } from "../../reducers/productReducers/productInfoWithWeight";
import { returnEditedObject } from "../../helper/functions";
import {
  addProductToList,
  addProductToMeal,
} from "../../reducers/mealReducers/mealInfoReducer";
import Button from "../Reusable Components/Button";
import { addProductSchema } from "../../schemas/zodSchemas/addProduct";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RootState } from "../../types/reducersTypes";
import {
  setProdInfoModal,
  setProdsModal,
} from "../../reducers/modalReducers/modalReducers";

const ProductAddModal = () => {
  const productInfo = useSelector((state: RootState) => state.productInfo);
  type ProductWeight = z.infer<typeof addProductSchema>;
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductWeight>({
    resolver: zodResolver(addProductSchema),
  });
  // Add product nutrition values to the meal
  const handleSaveClick = (data: ProductWeight) => {
    // Check product weight
    // !! needs to be added checking for negative values
    // Create a new object, where product values are based on the weight of the product
    const newObject = returnEditedObject(productInfo, data.weight);
    dispatch(addProductToMeal(newObject));
    dispatch(addProductToList(newObject));
    dispatch(setProdInfoModal(false));
    dispatch(clearProdInfo());
  };
  return (
    <form onSubmit={handleSubmit(handleSaveClick)}>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
        <div className="absolute bg-gray-900 opacity-50 top-0 left-0 w-full h-full"></div>
        <div className="bg-white rounded-lg p-8 z-10 relative h-1/2 w-1/2">
          <h2>Set weight for {productInfo.title}</h2>
          <div>
            {Object.entries(productInfo).map(([key, value], mapkey) => {
              if (key !== "product_id")
                return (
                  <h4 key={mapkey}>
                    {key}: {value as ReactNode}
                  </h4>
                );
            })}
          </div>
          <div className="flex flex-col items-center ">
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  defaultValue={0}
                  type="float"
                  placeholder="Enter weight"
                  className="px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            />

            <span className="error text-red-600 h-5 m-4">
              <>
                {errors?.weight?.message !== null
                  ? errors?.weight?.message
                  : null}
              </>
            </span>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              onClick={() => {
                dispatch(setProdsModal(false));
                dispatch(clearProdInfo());
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ProductAddModal;
