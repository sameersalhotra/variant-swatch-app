// Temporary in-memory store (replace with DB or Shopify metafields)
let assignedImageData = {};

export default function handler(req, res) {
  const { productId, variantId } = req.query;

  const key = `${productId}-${variantId}`;
  const assigned = assignedImageData[key] || [];

  res.status(200).json({ assignedImages: assigned });
}

export { assignedImageData };
