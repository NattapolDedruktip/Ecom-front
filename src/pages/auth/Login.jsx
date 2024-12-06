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
    <div>
      Login
      <form onSubmit={handleSubmit}>
        Email
        <input
          className="border"
          name="email"
          type="email"
          onChange={handleOnChange}
        />
        Password
        <input
          className="border"
          type="password"
          name="password"
          onChange={handleOnChange}
        />
        <button className="bg-blue-300"> Login </button>
      </form>
    </div>
  );
};
export default Login;
