import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../reducers/userReducers/userReducer";
import { useDispatch } from "react-redux";
import Button from "../Reusable Components/Button";

const schema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email({
    message: "Please enter an email",
  }),
  password: z.string().nonempty({ message: "Password is required" }),
});
type FormData = z.infer<typeof schema>;
const LoginForm: React.FC = () => {
  const [authError, setAuthError] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const loginUser = useMutation({
    mutationFn: (user: FormData) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, user, {
        withCredentials: true,
      });
    },
    onSuccess: async ({ data }) => {
      dispatch(setUser(data));
      navigation("/");
    },
    onError: async () => {
      setAuthError("Wrong email or password");
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
    loginUser.mutate(data);
  };
  return (
    <form
      className="w-1/5 p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md my-3"
      >
        Login
      </Button>
      <div className="h-5">
        {authError !== "" ? (
          <span className="text-red-600 font-bold">{authError}</span>
        ) : null}
      </div>
    </form>
  );
};
export default LoginForm;
