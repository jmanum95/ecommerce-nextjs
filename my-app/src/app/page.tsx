import Link from "next/link";

export default async function Landing() {
  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="flex flex-col items-center w-full md:min-w-3/4 md:w-3/4 p-6 rounded-lg md:mt-36">
        <div className="px-4 py-2 rounded-md">
          <h1 className="text-center text-9xl ">Tech Store</h1>
          <h2 className="mt-1 text-2xl md:text-3xl ">
            The latest technology products
          </h2>
        </div>
        <p className=" mt-8 text-xl md:text-2xl text-center">
          Discover the latest and greatest in technology at Tech Store! We offer
          top-quality gadgets, cutting-edge electronics, and innovative
          accessories to enhance your digital experience. Whether you're looking
          for the newest smartphones, powerful laptops, or smart home devices,
          we’ve got you covered. Shop with confidence and stay ahead of the tech
          curve!
        </p>
        <div className="flex gap-2 p-2 m-4">
          <Link
            href={"/products"}
            className="bg-primary text-xl rounded-md py-2 px-4 font-semibold transition-all hover:brightness-105"
          >
            See our products
          </Link>
          <Link
            href={"/login"}
            className="bg-primary text-xl rounded-md py-2 px-4 font-semibold transition-all hover:brightness-105"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
