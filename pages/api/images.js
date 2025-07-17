export default function handler(req, res) {
  const { productId } = req.query;

  // Dummy images (Replace with real product images via Shopify Admin API)
  const dummyImages = [
    { id: 1, src: '/images/red1.jpg', alt: 'Red Front' },
    { id: 2, src: '/images/red2.jpg', alt: 'Red Side' },
    { id: 3, src: '/images/black1.jpg', alt: 'Black Front' },
    { id: 4, src: '/images/black2.jpg', alt: 'Black Side' }
  ];

  res.status(200).json({ images: dummyImages });
}
