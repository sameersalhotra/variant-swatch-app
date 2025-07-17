import React from 'react';
import ImageSelector from '../components/ImageSelector';

const mockProduct = {
  options: [
    {
      name: 'Color',
      values: ['Red', 'Blue', 'Green']
    }
  ],
  images: [
    { src: 'https://via.placeholder.com/150/FF0000', alt: 'color: red' },
    { src: 'https://via.placeholder.com/150/FF6666', alt: 'color: red' },
    { src: 'https://via.placeholder.com/150/0000FF', alt: 'color: blue' },
    { src: 'https://via.placeholder.com/150/6666FF', alt: 'color: blue' },
    { src: 'https://via.placeholder.com/150/00FF00', alt: 'color: green' },
    { src: 'https://via.placeholder.com/150/66FF66', alt: 'color: green' },
  ]
};

export default function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Variant Swatch Test</h1>
      <ImageSelector product={mockProduct} />
    </div>
  );
}
