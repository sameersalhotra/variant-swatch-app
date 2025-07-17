import { assignedImageData } from './assigned-images';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { productId, variantId, imageIds } = req.body;

  if (!productId || !variantId || !Array.isArray(imageIds)) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const key = `${productId}-${variantId}`;
  assignedImageData[key] = imageIds;

  res.status(200).json({ message: 'Assigned successfully', data: assignedImageData[key] });
}
