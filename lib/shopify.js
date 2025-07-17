// lib/shopify.js
export async function getAllProducts() {
  const res = await fetch("/api/products"); // This will call our API route
  const data = await res.json();
  return data.products;
}
