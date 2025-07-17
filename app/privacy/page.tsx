'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Free Stock Img</title>
        <meta
          name="description"
          content="Learn how Free Stock Img collects, uses, and protects your personal information when you use our free AI-generated image platform."
        />
      </Head>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
          <p className="mb-4 text-gray-600">
            This Privacy Policy explains how Free Stock Img collects, uses, and protects your personal information.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Data Collection</h2>
          <ul className="list-disc ml-5 mb-4 space-y-2 text-gray-600">
            <li>We may collect basic usage data to improve our services.</li>
            <li>We use cookies to enhance user experience and analyze website traffic.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Data Usage</h2>
          <ul className="list-disc ml-5 mb-4 space-y-2 text-gray-600">
            <li>We do not sell or share your personal data with third parties.</li>
            <li>Collected data is used only to maintain and improve Free Stock Img.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-700">Your Privacy</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li>We take reasonable measures to protect your information.</li>
            <li>By using Free Stock Img, you consent to this Privacy Policy and its terms.</li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
