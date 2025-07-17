'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Use - Free Stock Img</title>
        <meta name="description" content="Terms and conditions for using Free Stock Img, a free library of AI-generated images." />
      </Head>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Use</h1>
          <p className="mb-4 text-gray-600">
            By using Free Stock Img, you agree to comply with and be bound by the following terms:
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Acceptance of Terms</h2>
          <p className="mb-4 text-gray-600">
            By accessing or using Free Stock Img, you agree to these Terms of Use. If you do not agree, please do not use our website.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">License & Usage</h2>
          <ul className="list-disc ml-5 mb-4 space-y-2 text-gray-600">
            <li>All images are AI-generated and provided free of charge.</li>
            <li>You may download, modify, and use the images for personal and commercial projects.</li>
            <li>Attribution is appreciated but not required.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Restrictions</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li>Do not resell or redistribute images as standalone files.</li>
            <li>Do not use images in unlawful, offensive, or misleading ways.</li>
            <li>We reserve the right to modify these terms at any time without notice.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
