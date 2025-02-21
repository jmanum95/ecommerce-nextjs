"use client";
import IProduct from "@/app/types/product";
import { toast } from "react-toastify";

interface IProps {
  product: IProduct;
}

const AddToCartButton = ({ product }: IProps) => {
  const userData = localStorage.getItem("userData");

  const addToCart = () => {
    const localCart = localStorage.getItem("cart");
    const cart: IProduct[] = localCart !== null ? JSON.parse(localCart) : null;
    if (cart) {
      const existingProduct = cart.find(
        (cartProduct) => cartProduct.id === product.id
      );
      if (existingProduct) {
        toast.error(
          "You can not add more than one of the same product to the cart"
        );
        return;
      } else {
        localStorage.setItem("cart", JSON.stringify([...cart, product]));
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([product]));
    }
    toast.success("Product added to cart");
  };

  return (
    <>
      {userData && (
        <button
          onClick={addToCart}
          className="bg-primary text-xl rounded-md py-2 px-4 mt-8 font-semibold transition-all hover:brightness-105"
        >
          Add to cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
