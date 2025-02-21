import Link from "next/link";
import Image from "next/image";
import { FaImage } from "react-icons/fa";
import { IoMdPricetag, IoIosArchive } from "react-icons/io";
import axios from "axios";
import AddToCartButton from "./components/AddToCartButton";
import IProduct from "@/app/types/product";
import { MdArrowBack } from "react-icons/md";

const Product = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const productId = (await params).productId;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const data = await axios
    .get(`${serverUrl}/products`)
    .then((res) =>
      res.data.find((product: IProduct) => String(product.id) === productId)
    );

  return (
    <div className="flex flex-col mt-4 justify-center">
      <Link
        type="submit"
        className="self-start bg-primary text-xl rounded-md py-2 px-4 mb-4 ml-4 font-semibold transition-all hover:brightness-105 flex items-center gap-2"
        href={"/products"}
      >
        <MdArrowBack /> Back
      </Link>
      <div className="self-center flex flex-col h-full w-11/12 md:w-1/2  border-primary bg-whitey/30 backdrop-blur-md rounded-md ">
        <div className="bg-white rounded-t-md p-4 h-96 min-h-96 flex justify-center items-center relative z-10">
          {data.image ? (
            <Image
              src={data.image}
              alt="Picture from product"
              fill
              sizes="100"
              className="rounded-t-md object-contain"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <FaImage size={48} />
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-2xl mb-2 truncate font-bold">{data.name}</h2>
          <p className="text-sm flex-grow">{data.description}</p>
          <div className="flex justify-between mt-4 text-lg font-semibold">
            <div className="flex items-center gap-1">
              <IoMdPricetag /> <span>${data.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoIosArchive /> <span>{data.stock}</span>
            </div>
          </div>
          <AddToCartButton product={data} />
        </div>
      </div>
    </div>
  );
};

export default Product;
