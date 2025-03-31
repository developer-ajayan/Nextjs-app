import { Product } from "@/utils/types";
import { setCookie, getCookie } from "@/utils/helpers";

// Get Cart from Cookies
export const getCart = (): Product[] => {
    const storedCart = getCookie("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

// Add to Cart
export const addToCart = (product: Product) => {
    const currentCart = getCart();
    const newCart = [...currentCart, product];
    setCookie("cart", JSON.stringify(newCart), 7);
    return newCart; // Return updated cart
};

// Remove from Cart
export const removeFromCart = (product: Product) => {
    const currentCart = getCart();
    const newCart = currentCart.filter((p) => p.slug !== product.slug);
    setCookie("cart", JSON.stringify(newCart), 7);
    return newCart; // Return updated cart
};
