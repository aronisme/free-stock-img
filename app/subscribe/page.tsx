'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css'
export default function SubscribePage() {
  return (
    <>
      <Header search="" setSearch={() => {}} handleSubmit={() => {}} />
      <main className="min-h-screen bg-white pt-16 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Subscription Plans</h1>
          <p className="mb-6 text-gray-600">
            Choose a subscription plan that suits your needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 shadow-md bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Free</h2>
              <p className="text-2xl font-bold mb-4">$0 <span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 text-gray-600">
                <li>✔️ Free Downloads</li>
                <li>✔️ Standard License</li>
                <li>✔️ Up to 100 downloads/month</li>
              </ul>
              <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition">
                Select Plan
              </button>
            </div>

            <div className="border rounded-lg p-6 shadow-lg bg-blue-50">
              <h2 className="text-xl font-semibold mb-2">Pro</h2>
              <p className="text-2xl font-bold mb-4">$9.99 <span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 text-gray-600">
                <li>✔️ Unlimited Downloads</li>
                <li>✔️ Commercial License</li>
                <li>✔️ Access All Categories</li>
              </ul>
              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                Select Plan
              </button>
            </div>

            <div className="border rounded-lg p-6 shadow-md bg-gray-50">
              <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
              <p className="text-2xl font-bold mb-4">Custom</p>
              <ul className="space-y-2 text-gray-600">
                <li>✔️ Unlimited Downloads</li>
                <li>✔️ Custom Licensing</li>
                <li>✔️ Priority Support</li>
              </ul>
              <button className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}