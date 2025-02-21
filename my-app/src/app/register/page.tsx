"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

interface IRegisterForm {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<IRegisterForm>({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });
  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
  });

  const signUpNewUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    try {
      await axios.post(`${serverUrl}/users/register`, {
        email: registerForm.email,
        password: registerForm.password,
        name: `${registerForm.firstName} ${registerForm.lastName}`,
        address: registerForm.address,
        phone: registerForm.phone,
      });
      toast.success("Register was successful");
      router.push("/login");
    } catch (error: any) {
      setRegisterForm({
        email: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
      });
      if (error.response.data.message) {
        toast.error(`An error ocurred: ${error.response.data.message}`);
      }
    }
  };

  const validatePassword = (name: string, value: string) => {
    const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (
      (name === "password" && value !== registerForm.repeatPassword) ||
      (name === "repeatPassword" && value !== registerForm.password)
    ) {
      setFormErrors({
        ...formErrors,
        password: "Passwords do not match",
      });
    } else if (!regex.test(value)) {
      setFormErrors({
        ...formErrors,
        password:
          "Password must contain 6 characters, one letter and one number.",
      });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  const validateText = (name: string, value: string) => {
    if (["firstName", "lastName", "address"].includes(name)) {
      if (value.trim().length < 3) {
        setFormErrors({
          ...formErrors,
          [name]: `Field ${name} must be at least 3 characters long`,
        });
      } else {
        setFormErrors({ ...formErrors, [name]: "" });
      }
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
    if (["password", "repeatPassword"].includes(event.target.name)) {
      validatePassword(event.target.name, event.target.value);
    } else if (event.target.name === "email") {
      validateEmail(event.target.value);
    } else {
      validateText(event.target.name, event.target.value);
    }
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center w-full h-screen justify-center">
      <div className="bg-whitey/30 backdrop-blur-md rounded-md flex flex-col justify-center items-center text-xl w-11/12 md:w-1/3 py-4 shadow-md">
        <h2 className="text-7xl lg:text-8xl  truncate">Tech store</h2>
        <h3 className="mb-4 ">Create a new account</h3>
        <form className="flex flex-col gap-1 justify-center items-center p-4">
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={registerForm.firstName}
              placeholder="First Name"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={registerForm.lastName}
              placeholder="Last Name"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 items-center w-full">
            <p
              className={`text-red-500 text-xs ${
                formErrors.firstName || formErrors.lastName ? "" : "my-2"
              }`}
            >
              {formErrors.firstName || formErrors.lastName}
            </p>
          </div>
          <div className="flex gap-2 items-center w-full">
            <input
              type="email"
              id="email"
              name="email"
              value={registerForm.email}
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
              value={registerForm.password}
              placeholder="Password"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
            <input
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              value={registerForm.repeatPassword}
              placeholder="Repeat password"
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
          <div className="flex gap-2 items-center w-full">
            <input
              type="text"
              id="address"
              name="address"
              value={registerForm.address}
              placeholder="Address"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 items-center w-full">
            <p
              className={`text-red-500 text-xs ${
                formErrors.address ? "" : "my-2"
              }`}
            >
              {formErrors.address}
            </p>
          </div>
          <div className="flex gap-2 items-center w-full">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={registerForm.phone}
              placeholder="Phone"
              onChange={handleChangeForm}
              className="w-full px-2 py-1 border rounded-md text-black"
              required
              autoComplete="off"
            />
          </div>
          <div className="flex gap-2 items-center w-full">
            <p
              className={`text-red-500 text-xs ${
                formErrors.phone ? "" : "my-2"
              }`}
            >
              {formErrors.phone}
            </p>
          </div>
          <button
            className="bg-primary text-xl rounded-md py-2 px-8 mt-4 font-semibold enabled:hover:brightness-105 disabled:saturate-0 transition-all"
            onClick={signUpNewUser}
            disabled={
              Object.values(formErrors).some((error) => error !== "") ||
              Object.values(registerForm).some((field) => field === "")
            }
          >
            Sign up
          </button>
          <Link
            className="mt-2 text-base transition-all hover:underline hover:cursor-pointer "
            href={"/login"}
          >
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
