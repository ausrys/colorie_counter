import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { addProductSchema } from "../../schemas/zodSchemas/zodSchemas";
import { useLoaderData } from "react-router-dom";
import { Category } from "../../types/productTypes";
type FormData = z.infer<typeof addProductSchema>;
const AddProduct: React.FC = () => {
  const [prodError, setprodError] = useState("");
  const [prodSuccess, setProdSuccess] = useState("");
  const data: any = useLoaderData();
  const addproduct = useMutation({
    mutationFn: (product: FormData) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/products/add`,
        product,
        {
          withCredentials: true,
        }
      );
    },
    onError: async (error: any) => {
      setprodError(error?.response?.data?.error);
      setProdSuccess("");
    },
    onSuccess: ({ data }) => {
      reset();
      setProdSuccess(data);
      setprodError("");
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addProductSchema),
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    addproduct.mutate(data);
  };
  return (
    <form
      className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label className="block text-gray-700">Product's name</label>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} className="w-full px-3 py-2 border rounded-md" />
          )}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Calories</label>
        <Controller
          name="calories"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
        />
        {errors.calories && (
          <p className="text-red-500">{errors.calories.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Protein</label>
        <Controller
          name="protein"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input {...field} className="w-full px-3 py-2 border rounded-md" />
          )}
        />
        {errors.protein && (
          <p className="text-red-500">{errors.protein.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Carbs</label>
        <Controller
          name="carbs"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <input {...field} className="w-full px-3 py-2 border rounded-md" />
          )}
        />
        {errors.carbs && <p className="text-red-500">{errors.carbs.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <Controller
          name="food_cateogry_id"
          control={control}
          defaultValue={1}
          render={({ field }) => (
            <select {...field} className="w-full px-3 py-2 border rounded-md">
              {data.map((category: Category) => (
                <option
                  key={category.food_category_id}
                  value={category.food_category_id}
                  className="mx-auto"
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          )}
        />
        {errors.carbs && <p className="text-red-500">{errors.carbs.message}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Add the product
      </button>
      {prodError !== "" ? (
        <div className="bg-red-500 my-2  text-white py-2 px-4 rounded-md">
          <p>{prodError}</p>
        </div>
      ) : null}
      {prodSuccess !== "" ? (
        <div className="bg-green-500 my-2  text-white py-2 px-4 rounded-md">
          <p>{prodSuccess}</p>
        </div>
      ) : null}
    </form>
  );
};
export default AddProduct;
