// pages/api/products.js
export default async function handler(req, res) {
  const response = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-04/products.json`, {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  res.status(200).json({ products: data.products });
}
