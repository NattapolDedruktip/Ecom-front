import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { div, p, span } from "motion/react-client";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email!!" }),
    password: z
      .string()
      .min(8, { message: "password must have at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password is not match with ConfirmPassword",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  console.log("passwordScore", passwordScore);

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  const onSubmit = async (data) => {
    const passwordScore = zxcvbn(data.password).score;
    console.log(data);
    if (passwordScore < 3) {
      toast.warning("Password is not strong!");
      return;
    }
    console.log("ok ready to register");
    try {
      const res = await axios.post(
        "https://ecom-back-pearl.vercel.app/api/register",
        data
      );
      console.log(res);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                className={`border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email && "border-red-500"
                }`}
                {...register("email")}
                placeholder="Email..."
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password ..."
                className={`border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.password && "border-red-500"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1">
                      <div
                        className={`rounded h-2 ${
                          passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password ..."
                className={`border w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.confirmPassword && "border-red-500"
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button className="bg-blue-500 rounded-md p-2 w-full text-white shadow-md hover:bg-blue-700">
              {" "}
              Register{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
