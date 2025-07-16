import React, { useState, useEffect } from 'react';

const ImageSelector = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantImages, setVariantImages] = useState([]);

  useEffect(() => {
    if (!product) return;

    const variantMap = {};

    product.images.forEach((img) => {
      const alt = img.alt || '';
      const match = alt.match(/color:\s*(\w+)/i);
      if (match) {
        const color = match[1].toLowerCase();
        if (!variantMap[color]) variantMap[color] = [];
        variantMap[color].push(img.src);
      }
    });

    setVariantImages(variantMap);

    // Set default variant to first option
    const defaultColor = product.options[0]?.values[0]?.toLowerCase();
    setSelectedVariant(defaultColor);
  }, [product]);

  const handleVariantChange = (color) => {
    setSelectedVariant(color.toLowerCase());
  };

  return (
    <div>
      <h3>Select Variant:</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(variantImages).map((color) => (
          <button
            key={color}
            onClick={() => handleVariantChange(color)}
            style={{
              padding: '8px 12px',
              border: selectedVariant === color ? '2px solid black' : '1px solid gray',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {variantImages[selectedVariant]?.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${selectedVariant} image ${index + 1}`}
            width="150"
            height="150"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
