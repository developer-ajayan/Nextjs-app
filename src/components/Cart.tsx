"use client";

import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/utils/helpers"; // Ensure setCookie is implemented
import { Product } from "@/utils/types";
import { removeFromCart } from "@/utils/carthelper";

export const CartModal = () => {
    const [cart, setCart] = useState<Product[]>([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const storedCart = getCookie("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleRemoveFromCart = (product: Product) => {
        removeFromCart(product);
        setCart((prevCart) => prevCart.filter((p) => p.slug !== product.slug));
    };

    const handleCheckout = () => {
        setOrderPlaced(true);
        setCart([]);
        setCookie("cart", JSON.stringify([]), 1); // Clear cart cookie (assuming setCookie is implemented)
    };

    const totalPrice = cart.reduce((sum, product) => sum + (product.price || 0), 0);
    const discount = cart.length >= 3 ? totalPrice * 0.05 : 0;
    const finalPrice = totalPrice - discount;

    return (
        <div className="flex justify-center items-center text-black">
            <div className="flex flex-col items-center">
                <span className="py-5 text-xl font-bold">Wish List</span>

                {orderPlaced ? (
                    <div className="text-center">
                        <h2 className="text-lg font-bold text-green-600">Order Placed Successfully!</h2>
                        <p className="text-gray-600">Thank you for your purchase.</p>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-col gap-4">
                            {cart.length > 0 ? (
                                cart.map((product) => (
                                    <div key={product.slug} className="flex justify-between items-center gap-4 w-64 border-b pb-2">
                                        <label htmlFor={product.slug} className="flex-1 text-left">
                                            {product.name} - ${product.price}
                                        </label>
                                        <button
                                            className="cursor-pointer"
                                            onClick={() => handleRemoveFromCart(product)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                                                <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-500">No products in cart.</div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="py-5 text-lg text-center">
                                {cart.length >= 3 && (
                                    <div className="text-sm text-green-500">
                                        Discount: -${discount.toFixed(2)} (5%)
                                    </div>
                                )}
                                <span className="font-bold">Total Price: ${finalPrice.toFixed(2)}</span>
                                <button
                                    className="bg-indigo-500 text-white p-2 mt-2 w-full rounded-md cursor-pointer"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
