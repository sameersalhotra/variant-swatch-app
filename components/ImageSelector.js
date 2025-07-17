// File: components/ImageSelector.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSelector = ({ productId, variants, onAssign }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [images, setImages] = useState([]);
  const [assignedImages, setAssignedImages] = useState({});

  useEffect(() => {
    if (productId) {
      axios.get(`/api/images?productId=${productId}`)
        .then((res) => {
          setImages(res.data.images);
        });

      axios.get(`/api/assigned-images?productId=${productId}`)
        .then((res) => {
          setAssignedImages(res.data.assigned || {});
        });
    }
  }, [productId]);

  const handleAssign = (variantId, selectedImages) => {
    axios.post('/api/assign-images', {
      productId,
      variantId,
      images: selectedImages
    }).then((res) => {
      setAssignedImages((prev) => ({
        ...prev,
        [variantId]: selectedImages
      }));
      if (onAssign) onAssign(variantId, selectedImages);
    });
  };

  const renderImages = () => {
    const alreadyAssigned = Object.values(assignedImages).flat();
    return images.filter((img) => !alreadyAssigned.includes(img.src)).map((img) => (
      <label key={img.src} style={{ marginRight: '10px' }}>
        <input
          type="checkbox"
          value={img.src}
          onChange={(e) => {
            const selected = new Set(assignedImages[selectedVariant?.id] || []);
            if (e.target.checked) {
              selected.add(e.target.value);
            } else {
              selected.delete(e.target.value);
            }
            setAssignedImages((prev) => ({
              ...prev,
              [selectedVariant.id]: Array.from(selected)
            }));
          }}
          checked={(assignedImages[selectedVariant?.id] || []).includes(img.src)}
        />
        <img src={img.src} alt="variant" width="60" height="60" />
      </label>
    ));
  };

  return (
    <div>
      <h2>Select Variant</h2>
      <select
        onChange={(e) => {
          const variant = variants.find(v => v.id === e.target.value);
          setSelectedVariant(variant);
        }}
      >
        <option value="">-- Select Variant --</option>
        {variants.map((v) => (
          <option key={v.id} value={v.id}>{v.option1 || v.title}</option>
        ))}
      </select>

      {selectedVariant && (
        <div>
          <h3>Assign Images to: {selectedVariant.option1 || selectedVariant.title}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderImages()}
          </div>
          <button
            onClick={() => handleAssign(selectedVariant.id, assignedImages[selectedVariant.id] || [])}
            style={{ marginTop: '10px' }}
          >
            Save Assignment
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
