import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  // const navigate = useNavigate();
  // hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // state
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  // CONTEXT
  const { signin } = useContext(AuthContext);

  // hook

  // ANIMATION
  // submit
  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    setTimeout(() => {
      signin(email, password);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="transition-all">
      <div className="flex items-center justify-center mt-4">
        <button
          class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-4/5"
          onClick={() => setShowLogin(!showLogin)}
        >
          Login
        </button>
      </div>

      <Modal showModal={showLogin} setShowModal={setShowLogin}>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="w-[500px] bg-white p-8 rounded-lg"
        >
          {" "}
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 mb-5 text-sm text-center text-gray-600">
            Don't have an account yet ?
            <span className="font-medium text-blue-600 hover:text-blue-500">
              <Link to="/signup"> signup</Link>
            </span>
          </p>
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
      </Modal>
    </div>
  );
};

export default LoginPage;
