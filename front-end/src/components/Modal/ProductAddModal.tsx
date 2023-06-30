import { ReactNode, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearProdInfo } from "../../reducers/productReducers/productInfoWithWeight";
import { ProductType } from "../../types/productTypes";
import { returnEditedObject } from "../../helper/functions";
import {
  addProductToList,
  addProductToMeal,
} from "../../reducers/mealReducers/mealInfoReducer";
import { closeProdModal } from "../../reducers/modalReducers/modalReducers";
import Button from "../Reusable Components/Button";

type Props = {};

const ProductAddModal = (props: any) => {
  const productInfo = useSelector((state: any) => state.productInfo);
  const productWeight = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  // Add product nutrition values to the meal
  const handleSaveClick = (product: ProductType) => {
    // Check product weight
    // !! needs to be added checking for negative values
    const inputValue = productWeight.current?.value ?? 0;
    // Create a new object, where product values are based on the weight of the product
    const newObject = returnEditedObject(product, Number(inputValue));
    dispatch(addProductToMeal(newObject));
    dispatch(addProductToList(newObject));
    dispatch(clearProdInfo());
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="absolute bg-gray-900 opacity-50 top-0 left-0 w-full h-full"></div>
      <div className="bg-white rounded-lg p-8 z-10 relative h-1/2 w-1/2">
        <h2>Set weight for {productInfo.title}</h2>
        <div>
          {Object.entries(productInfo).map(([key, value], mapkey) => {
            return (
              <h4 key={mapkey}>
                {key}: {value as ReactNode}
              </h4>
            );
          })}
        </div>
        <input
          type="number"
          placeholder="Enter weight in grams"
          className="border border-gray-300 p-2 mt-4 bg-white"
          min={1}
          ref={productWeight}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={() => {
              handleSaveClick(productInfo);
              dispatch(clearProdInfo());
              props.setProdInfoModal(false);
              dispatch(closeProdModal());
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              props.setProdInfoModal(false);
              dispatch(clearProdInfo());
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductAddModal;
