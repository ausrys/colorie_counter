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
  closeAllModals,
  setProdInfoModal,
  setProdsModal,
} from "../../reducers/modalReducers/modalReducers";

const ProductAddModal: React.FC = () => {
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
    // Create a new object, where product values are based on the weight of the product
    const newObject = returnEditedObject(productInfo, data.weight);
    if (newObject.product_id > 0) {
      dispatch(addProductToMeal(newObject));
      dispatch(addProductToList(newObject));
      dispatch(closeAllModals());
      dispatch(clearProdInfo());
      return;
    }
    dispatch(closeAllModals());
    dispatch(clearProdInfo());
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      {/* Modal Overlay */}
      <div className="absolute bg-gray-900 opacity-50 top-0 left-0 w-full h-full z-10"></div>

      {/* Modal */}
      <div className="bg-white rounded-lg p-8 z-20 relative min-h-1/2 w-1/2 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-800">
          Set weight for {productInfo.title}
        </h2>

        {/* Product Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-800">
            Product Information
          </h2>
          {Object.entries(productInfo).map(([key, value], mapkey) => {
            if (key !== "product_id") {
              return (
                <div
                  key={mapkey}
                  className="flex justify-between items-center mb-1"
                >
                  <span className="text-gray-600">{key}</span>
                  <span className="text-indigo-600">{value as ReactNode}</span>
                </div>
              );
            }
          })}
        </div>

        {/* Weight Input */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="flex flex-col items-center mt-3 mb-1">
            <Controller
              name="weight"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Enter weight"
                  className="w-40 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  step={0.1}
                />
              )}
            />

            <span className="error text-red-600 mt-2">
              {errors?.weight?.message || null}
            </span>
          </div>
          {/* Buttons */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mr-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Save
            </Button>
            <Button
              type="button"
              onClick={() => {
                dispatch(setProdInfoModal(false));
                dispatch(clearProdInfo());
              }}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ProductAddModal;
