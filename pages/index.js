import React from 'react';
import Head from 'next/head';
import ImageSelector from '../components/ImageSelector';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trendlok Variant Swatch Admin</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
        <h1>🖼️ Trendlok Variant Image Assigner</h1>
        <p>Select a product and assign images to each color or size variant.</p>
        <ImageSelector />
      </main>
    </>
  );
}
