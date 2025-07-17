'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FaqPage() {
  return (
    <>
      <Head>
        <title>FAQ - Free Stock Img</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Free Stock Img, a platform offering free AI-generated images for personal and commercial use."
        />
      </Head>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg">What is Free Stock Img?</h2>
              <p className="text-gray-600 mt-2">
                Free Stock Img is a free platform that offers AI-generated images you can use for personal and commercial projects.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg">Are all images really free?</h2>
              <p className="text-gray-600 mt-2">
                Yes! All images on Free Stock Img are completely free to download and use under our licensing terms.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg">Do I need to give attribution?</h2>
              <p className="text-gray-600 mt-2">
                Attribution is appreciated but not required, unless specifically mentioned for certain images.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold text-lg">Can I use images for commercial projects?</h2>
              <p className="text-gray-600 mt-2">
                Yes, our images can be used for personal and commercial purposes, as long as you follow our Terms of Use.
              </p>
            </div>

            <div className="pb-4">
              <h2 className="font-semibold text-lg">How can I contact support?</h2>
              <p className="text-gray-600 mt-2">
                You can reach us through our <a href="/contact" className="text-blue-600 underline">Contact Page</a>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
