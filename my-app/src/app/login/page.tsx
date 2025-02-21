"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [signInForm, setSignInForm] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const signInUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      const { data } = await axios.post(`${serverUrl}/users/login`, {
        email: signInForm.email,
        password: signInForm.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("cart", JSON.stringify([]));
      
      toast.success("Login successful");
      router.push("/products");
    } catch (error: any) {
      toast.error(`Error: ${error.response.data.message}`);
    }
  };

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
    setSignInForm({
      ...signInForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <div className="flex flex-col justify-center items-center bg-whitey/30 backdrop-blur-md rounded-md text-xl w-11/12 md:w-1/3 py-4 shadow-md">
        <h2 className="text-7xl lg:text-8xl mb-4  truncate">Tech store</h2>
        <form className="flex flex-col gap-1 justify-center items-center p-4">
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              id="email"
              name="email"
              value={signInForm.email}
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
              value={signInForm.password}
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
            onClick={signInUser}
            disabled={
              Object.values(formErrors).some((error) => error !== "") ||
              Object.values(signInForm).some((field) => field === "")
            }
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
