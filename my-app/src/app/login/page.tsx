"use client";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { login } from "./actions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [state, loginAction] = useActionState(login, undefined);

  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const validatePassword = (value: string) => {
    const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!regex.test(value)) {
      setFormErrors({
        ...formErrors,
        password: "Password is not valid",
      });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  const validateEmail = (value: string) => {
    const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regex.test(value)) {
      setFormErrors({
        ...formErrors,
        email: `Email is not valid`,
      });
    } else {
      setFormErrors({ ...formErrors, email: "" });
    }
  };

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "email") {
      validateEmail(event.target.value);
    }
    if (event.target.name === "password") {
      validatePassword(event.target.value);
    }
  };

  useEffect(() => {
    if (state && state.error) {
      toast.error(`Error: ${state.error}`);
      setFormErrors({
        email: "",
        password: "",
      });
    }
    if (state && state.success) {
      localStorage.setItem("token", state.data.token);
      localStorage.setItem("userData", JSON.stringify(state.data.user));
      localStorage.setItem("cart", JSON.stringify([]));
      toast.success("User logged in succesfuly");
      redirect("/products");
    }
  }, [state]);

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <div className="flex flex-col justify-center items-center bg-whitey/30 backdrop-blur-md rounded-md text-xl w-11/12 md:w-1/3 py-4 shadow-md">
        <h2 className="text-7xl lg:text-8xl mb-4  truncate">Tech store</h2>
        <form
          action={loginAction}
          className="flex flex-col gap-1 justify-center items-center p-4"
        >
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 items-center w-full text-black">
            <p
              className={`text-red-500 text-xs ${
                formErrors.email ? "" : "my-2"
              }`}
            >
              {formErrors.email}
            </p>
          </div>
          <div className="flex gap-2 items-center w-full">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 items-center w-full">
            <p
              className={`text-red-500 text-xs ${
                formErrors.password ? "" : "my-2"
              }`}
            >
              {formErrors.password}
            </p>
          </div>
          <button
            className="bg-primary text-xl rounded-md py-2 px-8 font-semibold enabled:hover:brightness-105 disabled:saturate-0 transition-all"
            disabled={Object.values(formErrors).some((error) => error !== "")}
          >
            Log in
          </button>
          <Link
            className="mt-2 text-base transition-all hover:underline hover:cursor-pointer "
            href={"/register"}
          >
            Create an account
          </Link>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
