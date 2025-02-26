"use server";
import axios from "axios";
import { createSession } from "../lib/session";

const signInUser = async (email: string, password: string) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const { data } = await axios.post(`${serverUrl}/users/login`, {
      email: email,
      password: password,
    });
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.response.data.message || "Unhandled error" };
  }
};

export const login = async (prevState: any, formData: FormData) => {
  const login = await signInUser(
    formData.get("email") as string,
    formData.get("password") as string
  );
  if (login?.error) {
    return { error: login.error };
  }
  if (login?.token) {
    await createSession(login.token);
    return { success: "User logged in", data: login };
  }
  return { error: "Unhandled error" };
};
