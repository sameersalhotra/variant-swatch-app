import ImageSelector from "../components/ImageSelector";

export default function Home() {
  // 🧪 Test product (replace with real Shopify data later)
  const product = {
    options: [
      { name: "Color", values: ["Red", "Blue", "Green"] }
    ],
    images: [
      { src: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=Red+1", alt: "color: Red" },
      { src: "https://via.placeholder.com/300x300/FF0000/FFFFFF?text=Red+2", alt: "color: Red" },
      { src: "https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Blue+1", alt: "color: Blue" },
      { src: "https://via.placeholder.com/300x300/0000FF/FFFFFF?text=Blue+2", alt: "color: Blue" },
      { src: "https://via.placeholder.com/300x300/00FF00/FFFFFF?text=Green+1", alt: "color: Green" }
    ]
  };

  return (
    <main style={{ padding: "40px" }}>
      <h1>🧪 Trendlok Variant Swatch App (Preview)</h1>
      <p>This is a test preview using static product data.</p>
      <ImageSelector product={product} />
    </main>
  );
}
