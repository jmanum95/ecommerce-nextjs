import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-60 flex flex-col gap-2 items-center w-full">
      <div className="text-3xl flex justify-center w-3/4 rounded-md bg-whitey/30 backdrop-blur-md">
        <h2>404 Not Found</h2>
        <div className="mx-2">/</div>
        <p>Could not find requested resource</p>
      </div>
      <Link href="/" className="bg-primary text-xl rounded-md py-2 px-4 mt-8 font-semibold  transition-all hover:brightness-105">
        Return
      </Link>
    </div>
  );
}
