import { Product } from "@/utils/types";
import { addToCart, removeFromCart } from '@/utils/carthelper'; // Assuming you're using nookies
import ListPage from "@/app/cart/CartList";
import CartModal from "./CartModal";

type ProductListProps = {
    products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {

    const handleAddToCart = (product: Product, isChecked: boolean) => {
        if (isChecked) {
            addToCart(product);
        } else {
            removeFromCart(product);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col items-center">
                <span className="py-5 text-xl font-bold">Product List</span>
                <div className="flex flex-col gap-4">
                    {products.map((product) => (
                        <div key={product.slug} className="flex justify-between items-center gap-4 w-64 border-b pb-2">
                            <label htmlFor={product.slug} className="flex-1 text-left">
                                {product.name} - ${product.price}
                            </label>
                            <input
                                type="checkbox"
                                id={product.slug}
                                name={product.slug}
                                value={product.name}
                                onChange={(e) => handleAddToCart(product, e.target.checked)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
};

export default ProductList;