import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  // console.log("user from zustand ", user);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);
    try {
      const res = await actionLogin(form);
      // console.log("res", res);
      const role = res.data.payload.role;
      console.log("role", role);
      roleRedirect(role);
      toast.success("Welcome Back");
    } catch (err) {
      // console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role == "admin") {
      navigate("/admin");
    } else {
      navigate(-1); // go to previous url
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              placeholder="Email..."
              className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              name="email"
              type="email"
              onChange={handleOnChange}
            />

            <input
              placeholder="Password..."
              className="border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              name="password"
              onChange={handleOnChange}
            />
            <button className="bg-blue-500 rounded-md p-2 w-full text-white shadow-md hover:bg-blue-700">
              {" "}
              Login{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
