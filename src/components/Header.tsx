"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CartModal from "@/components/Cart";
import { deleteCookie, getCookie } from "@/utils/helpers";
import { logoutUser } from "@/actions/servercalls";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const buttons = [
    { label: "Wishlist App", link: "/" },
    { label: "Cart", modal: true,extra_class:"end-0" },
  ];
  useEffect(() => {
    setEmail(getCookie("email"));
  }, []);

  const handleLogout = async () => {
    // TODO : add loader
    await logoutUser();
    deleteCookie("email")
    deleteCookie("cart")
    setEmail(null); 

    window.location.href="/"
    
  };

  return (
    <header className="p-4 bg-gray-800 text-white flex gap-4">
      {buttons.map((btn, index) =>
        btn.modal ? (
          <button
            key={index}
            onClick={() => setIsModalOpen(true)}
            className={`px-4 py-2 bg-blue-500 rounded ${btn.extra_class}`}
          >
            {btn.label}
          </button>
          
        ) : (
          <Link key={index} href={btn.link} className="px-4 py-2 bg-gray-600 rounded">
            {btn.label}
          </Link>
        )
        
      )}
      {email && (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded ml-auto"
        >
          Logout
        </button>
      )}

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg">
              <CartModal />
          
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white p-2 w-full rounded-md cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
