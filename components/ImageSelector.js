import React, { useEffect, useState } from 'react';

const ImageSelector = () => {
  const [productId, setProductId] = useState('123'); // Example product ID
  const [variants, setVariants] = useState([
    { id: 'v1', title: 'Red' },
    { id: 'v2', title: 'Black' }
  ]);
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [images, setImages] = useState([]);
  const [assignedImages, setAssignedImages] = useState([]);
  const [selectedImageIds, setSelectedImageIds] = useState([]);

  // Load images from API
  useEffect(() => {
    fetch(`/api/images?productId=${productId}`)
      .then(res => res.json())
      .then(data => setImages(data.images));
  }, [productId]);

  // Load assigned images for selected variant
  useEffect(() => {
    if (!selectedVariantId) return;
    fetch(`/api/assigned-images?productId=${productId}&variantId=${selectedVariantId}`)
      .then(res => res.json())
      .then(data => setAssignedImages(data.assignedImages));
  }, [selectedVariantId]);

  // Filter images not yet assigned to this variant
  const availableImages = images.filter(img => !assignedImages.includes(img.id));

  const toggleImageSelection = (id) => {
    setSelectedImageIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    if (!selectedVariantId || selectedImageIds.length === 0) return;

    const res = await fetch('/api/assign-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, variantId: selectedVariantId, imageIds: selectedImageIds })
    });

    const data = await res.json();
    alert(data.message);
    setAssignedImages(data.data);
    setSelectedImageIds([]);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assign Images to Variant</h2>

      <label>Select Variant:</label>
      <select value={selectedVariantId} onChange={e => setSelectedVariantId(e.target.value)}>
        <option value="">-- Choose Variant --</option>
        {variants.map(v => (
          <option key={v.id} value={v.id}>{v.title}</option>
        ))}
      </select>

      {selectedVariantId && (
        <>
          <h3>Available Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableImages.map(img => (
              <div
                key={img.id}
                style={{
                  border: selectedImageIds.includes(img.id) ? '2px solid blue' : '1px solid gray',
                  padding: '5px',
                  cursor: 'pointer'
                }}
                onClick={() => toggleImageSelection(img.id)}
              >
                <img src={img.src} alt={img.alt} width="100" />
              </div>
            ))}
          </div>

          <button onClick={handleAssign} style={{ marginTop: '15px' }}>Assign Selected Images</button>
        </>
      )}
    </div>
  );
};

export default ImageSelector;
