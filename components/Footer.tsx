'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-10 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Free Stock Img</h3>
            <p className="text-gray-600 text-sm">
              Free high-quality stock photos for personal and commercial use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-600 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-md font-semibold text-gray-700 mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">
              Subscribe to our newsletter for new free photo updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-xs">
          <p>© {new Date().getFullYear()} Free Stock Img by Aron M. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}