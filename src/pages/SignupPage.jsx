import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

const SignupPage = () => {
  const navigate = useNavigate();

  // CONTEXT
  const { currentUser, signup } = useContext(AuthContext);
  if (currentUser !== null) {
    navigate("/");
  }

  // state
  const [loading, setLoading] = useState(false);
  // hook-form
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    const { email, confirm_password, name, phone } = data;
    setLoading(true);
    setTimeout(() => {
      signup(email, confirm_password, name, phone);
      setLoading(false);
    }, 3000);
    console.log(data);
  };
  return (
    <>
      <ToastContainer />

      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-gray-900 bg-opacity-50 z-10 ">
        <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/4 z-20">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 bg-white rounded-lg lg:ml-6 lg:p-8"
          >
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Signup to creat an account
            </h2>
            <p className="mt-2 mb-5 text-sm text-center text-gray-600">
              Already have an account ?
              <span className="font-medium text-blue-600 hover:text-blue-500">
                <Link to="/login"> Signin</Link>
              </span>
            </p>

            <div className="relative mb-6">
              <Input
                name="name"
                type="text"
                register={register}
                placeholder="Username"
                required={{
                  value: true,
                  message: "username is required",
                }}
              />
              <p className="absolute text-base text-red-600 top-full left-1">
                {errors.name?.message}
              </p>
            </div>
            <div className="relative mb-6">
              <Input
                name="phone"
                type="number"
                register={register}
                placeholder="Phone"
                required={{
                  value: true,
                  message: "phone number is required",
                }}
              />
              <p className="absolute text-base text-red-600 top-full left-1">
                {errors.phone?.message}
              </p>
            </div>
            <div className="relative mb-6">
              <Input
                name="email"
                type="email"
                register={register}
                placeholder="Email"
                required={{
                  value: true,
                  message: "Email is required",
                }}
              />
              <p className="absolute text-base text-red-600 top-full left-1">
                {errors.email?.message}
              </p>
            </div>
            <div className="relative mb-6">
              <Input
                name="password"
                type="password"
                register={register}
                placeholder="Password"
                required={{
                  value: true,
                  message: "Password is required",
                }}
              />
              <p className="absolute text-base text-red-600 top-full left-1">
                {errors.password?.message}
              </p>
            </div>
            <div className="relative mb-6">
              <div className="my-5">
                <input
                  {...register("confirm_password", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match", // Kiểm tra xem mật khẩu xác nhận có khớp với mật khẩu không
                  })}
                  type="password"
                  className="w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none lock focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  name="confirm_password"
                  placeholder="Confirm Password"
                />
              </div>
              <p className="absolute text-base text-red-600 top-full left-1">
                {errors?.confirm_password?.message}
              </p>
            </div>
            {loading ? (
              <Spinner loading={loading}></Spinner>
            ) : (
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 mt-10 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
