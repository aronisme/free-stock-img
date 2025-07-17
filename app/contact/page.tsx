'use client';

import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - Free Stock Img</title>
        <meta
          name="description"
          content="Contact Free Stock Img team if you have questions, suggestions, or need support for our free AI-generated images."
        />
      </Head>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
          <p className="mb-6 text-gray-600">
            If you have any questions, suggestions, or need help, please fill out the form below and we'll get back to you soon.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                id="message"
                rows={5}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
