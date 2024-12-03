import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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
    if (form.password !== form.confirmPassword) {
      return alert("confirm password is not match");
    }
    console.log(form);

    try {
      const res = await axios.post("http://localhost:8000/api/register", form);
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(errMsg);
    }
  };

  return (
    <div>
      Register
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
        Confirm Password
        <input
          className="border"
          type="password"
          name="confirmPassword"
          onChange={handleOnChange}
        />
        <button className="bg-blue-300"> register </button>
      </form>
    </div>
  );
};
export default Register;
