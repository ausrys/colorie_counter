import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../types/errors";
import Button from "../Reusable Components/Button";

const schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username should be atleast 3 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" }),
});
type FormData = z.infer<typeof schema>;
const RegisterForm: React.FC = () => {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const registerNewUser = useMutation({
    mutationFn: (user: FormData) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, user);
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: CustomError) => {
      if (error?.response?.data?.error)
        setAuthError(error?.response?.data?.error);
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    registerNewUser.mutate(data);
  };

  return (
    <form
      className="w-1/5 p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Username</label>
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} className="w-full px-3 py-2 border rounded-md" />
          )}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} className="w-full px-3 py-2 border rounded-md" />
          )}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password</label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full text-white py-2 px-4 rounded-md my-3"
      >
        Register
      </Button>
      <div className="h-5">
        {authError !== "" ? (
          <span className="text-red-600 font-bold">{authError}</span>
        ) : null}
      </div>
    </form>
  );
};

export default RegisterForm;
