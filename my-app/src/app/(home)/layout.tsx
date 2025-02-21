"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const location = usePathname();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setToken("");
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="font-bold text-xl fixed w-full z-50">
        <ul className="flex gap-2 p-4 bg-whitey/30 backdrop-blur-md justify-between">
          <div className="flex flex-row gap-2">
            <li>
              <Link
                href="/products"
                className={`p-2 rounded-md transition-all  ${
                  location === "/products"
                    ? "bg-whitey text-black"
                    : "hover:bg-whitey/30"
                }`}
              >
                Products
              </Link>
            </li>
            {token && (
              <li>
                <Link
                  href="/cart"
                  className={`p-2 rounded-md transition-all ${
                    location === "/cart"
                      ? "bg-whitey text-black"
                      : "hover:bg-whitey/30"
                  }`}
                >
                  Cart
                </Link>
              </li>
            )}
          </div>
          <div className="flex flex-row">
            {token && (
              <li>
                <Link
                  href="/my-account"
                  className={`p-2 rounded-md transition-all hover:bg-whitey/30 ${
                    location === "/my-account"
                      ? "bg-whitey text-black"
                      : "hover:bg-whitey/30"
                  }`}
                >
                  My account
                </Link>
              </li>
            )}
            {!token && (
              <li>
                <Link
                  href="/login"
                  className={`p-2 rounded-md transition-all hover:bg-whitey `}
                >
                  Sign-in
                </Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
      <section className="flex-1 mt-16">{children}</section>
      <footer>
        <p className="text-xs">&copy; 2025 Developed by jmanum</p>
      </footer>
    </div>
  );
};

export default HomeLayout;
