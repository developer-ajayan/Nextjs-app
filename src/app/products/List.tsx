"use client"

import ProductList from "@/components/ProductList";

export const ListPage = () => {
    const products = [
        { name: "Laptop", price: 1000, slug: "product1" },
        { name: "Smartphone", price: 700, slug: "product2" },
        { name: "Headphones", price: 150, slug: "product3" },
        { name: "Watch", price: 120, slug: "product4" },
        { name: "Charger", price: 180, slug: "product5" },
    ];


    return (
        <div >
            <ProductList products={products} />
        </div>
    )
}