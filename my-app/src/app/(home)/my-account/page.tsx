"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import IProduct from "@/app/types/product";
import IOrder from "@/app/types/order";
import IUser from "@/app/types/user";
import { MdCheck } from "react-icons/md";

const MyAccount = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [user, setUser] = useState<IUser>({
    id: 0,
    name: "",
    address: "",
    phone: "",
    email: "",
    role: "",
    credential: {
      id: 0,
      password: "",
    },
    orders: [],
  });

  const getOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const { data } = await axios(`${serverUrl}/users/orders`, {
        headers: {
          Authorization: token ?? "",
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="mt-2 p-4">
      <div className="flex justify-between p-2 mb-8 bg-whitey/30 backdrop-blur-md rounded-md">
        <h1 className="font-semibold text-4xl truncate">My account</h1>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="bg-primary text-xl rounded-md py-2 px-8 font-semibold transition-all hover:brightness-105"
        >
          Log out
        </button>
      </div>
      <table className="flex flex-col md:w-1/3 w-11/12 bg-whitey/30 backdrop-blur-md rounded-md p-4 m-auto text-xl shadow-md">
        <tbody>
          <tr className="flex gap-4">
            <td className="">Name:</td>
            <td className="">{user.name}</td>
          </tr>
          <tr className="flex gap-4">
            <td className="">Email:</td>
            <td className="">{user.email}</td>
          </tr>
          <tr className="flex gap-4">
            <td className="">Phone:</td>
            <td className="">{user.phone}</td>
          </tr>
          <tr className="flex gap-4">
            <td className="">Adress:</td>
            <td className="">{user.address}</td>
          </tr>
          <tr className="flex gap-4">
            <td className="">Role:</td>
            <td className="">{user.role}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h1 className="font-semibold bg-whitey/30 backdrop-blur-md rounded-md text-4xl p-2 mt-8 truncate">
          Orders history
        </h1>
        {orders.length !== 0 &&
          [...orders].reverse().map((order) => {
            return (
              <div
                key={order.id}
                className="bg-whitey/30 backdrop-blur-md rounded-md p-4 mt-2 flex w-11/12 md:w-1/2 m-auto gap-4 shadow-md"
              >
                <div className="flex flex-col items-center justify-center w-1/4">
                  <h3 className="truncate">Order ID: {order.id}</h3>
                  <p className="flex items-center gap-1">
                    {order.status === "approved" ? (
                      <MdCheck className="bg-green-500" />
                    ) : (
                      <></>
                    )}
                    {order.status}
                  </p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col gap-1 w-3/4">
                  {order.products.map((product: IProduct) => (
                    <div
                      key={product.id}
                      className="flex gap-2 w-full mt-2 max-h-2 items-center justify-center"
                    >
                      <span>{product.name}</span>
                      <span>${product.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyAccount;
