import RegisterForm from "../components/Register/RegisterForm";

const Register = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold my-4">Create an account</h1>
      <div className="flex justify-center my-5">
        <RegisterForm />
      </div>
    </div>
  );
};
export default Register;
