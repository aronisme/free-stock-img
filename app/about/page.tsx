'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us - Free Stock Img</title>
        <meta
          name="description"
          content="Learn more about Free Stock Img, a platform offering free AI-generated images for personal and commercial use."
        />
      </Head>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Us</h1>
          <p className="mb-4 text-gray-600">
            Free Stock Img is a free platform offering high-quality, AI-generated images for personal and commercial use.
          </p>
          <p className="mb-4 text-gray-600">
            We believe everyone should have access to unique and creative visuals without expensive subscriptions or licensing fees.
          </p>
          <p className="text-gray-600">
            Our mission is to empower creators, designers, and businesses by providing an ever-growing library of AI-generated images across categories like technology, nature, abstract art, and more.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
