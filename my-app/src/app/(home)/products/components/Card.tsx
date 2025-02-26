import Image from "next/image";
import Link from "next/link";
import { FaImage } from "react-icons/fa";
import { IoIosArchive, IoMdPricetag } from "react-icons/io";

interface IProps {
  id: number;
  name: string;
  price: string;
  stock: string;
  imageUrl?: string;
}

const Card = ({ id, name, price, stock, imageUrl }: IProps) => {
  return (
    <Link href={`/products/${id}`}>
      <div className="flex flex-col h-full col-span-1 border-primary bg-whitey/30 backdrop-blur-md rounded-md transition-all hover:brightness-105 shadow-md">
        <div className="bg-white rounded-t-md p-4 h-32 min-h-32 flex justify-center items-center relative z-10">
          {imageUrl ? (
            <Image
              src={imageUrl}
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
          <h2 className="text-2xl text-center mb-2 truncate font-bold ">
            {name}
          </h2>
          <div className="flex justify-around mt-4 font-semibold">
            <div className="flex items-center gap-1 ">
              <IoMdPricetag /> <span>${price}</span>
            </div>
            <div className="flex items-center gap-1 ">
              <IoIosArchive /> <span>{stock}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
