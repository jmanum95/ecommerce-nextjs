"use client";
import IProduct from "@/app/types/product";
import IUser from "@/app/types/user";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdClear } from "react-icons/md";
import { toast } from "react-toastify";

const Cart = () => {
  const router = useRouter();
  const [cart, setCart] = useState<IProduct[]>([]);

  const makeOrder = async () => {
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const token = localStorage.getItem("token");
      const userData = localStorage.getItem("userData");
      const parsedUserData: IUser =
        userData !== null ? JSON.parse(userData) : null;
      await axios.post(
        `${serverUrl}/orders`,
        {
          userId: parsedUserData.id,
          products: cart.map((item) => item.id),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Order succesfully created");
      localStorage.setItem("cart", JSON.stringify([]));
      router.push("/my-account");
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = (id: number) => {
    const cartData = localStorage.getItem("cart");
    const cart = cartData !== null ? JSON.parse(cartData) : null;
    localStorage.setItem(
      "cart",
      JSON.stringify([
        ...cart.filter((cartItem: IProduct) => cartItem.id !== id),
      ])
    );
    setCart([...cart.filter((cartItem: IProduct) => cartItem.id !== id)]);
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  return (
    <div className="mt-2 p-4">
      <h1 className="font-semibold bg-whitey/30 backdrop-blur-md rounded-md  text-4xl p-2 mb-4 truncate">
        Cart
      </h1>

      <table className="min-w-full bg-whitey text-black rounded-md shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Price</th>
          </tr>
        </thead>
        <tbody className="text-center align-middle">
          {cart.length ? (
            <>
              {cart.map((cartItem: IProduct, index: number) => {
                return (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{cartItem.name}</td>
                    <td className="py-2 px-4 border-b">1</td>
                    <td className="py-2 px-4 border-b">${cartItem.price}</td>
                    <td className="py-2 border-b">
                      <button
                        className="bg-red-400 text-white rounded-full transition-all hover:brightness-110"
                        onClick={() => removeItem(cartItem.id)}
                      >
                        <MdClear size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b"></th>
                <th className="py-2 px-4 border-b">
                  $
                  {cart
                    .reduce(
                      (total: number, cartItem: any) => total + cartItem.price,
                      0
                    )
                    .toFixed(2)}
                </th>
              </tr>
            </>
          ) : (
            <tr>
              <td className="py-2 px-4 border-b text-xl" colSpan={4}>
                No Items
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={makeOrder}
        className="bg-primary text-xl rounded-md py-2 px-4 mt-8 font-semibold  enabled:hover:brightness-105 disabled:saturate-0 transition-all"
        disabled={cart.length === 0}
      >
        Order
      </button>
    </div>
  );
};

export default Cart;
