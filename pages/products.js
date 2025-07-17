// pages/products.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProducts } from "@/lib/shopify";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Select a Product</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="p-4 bg-white shadow rounded">
            <Link href={`/products/${product.id}`}>
              <span className="cursor-pointer text-blue-600 hover:underline">{product.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
