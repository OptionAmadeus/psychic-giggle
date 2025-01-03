import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Features } from '../components/marketing/Features';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                to="/get-started"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <Features />
      </main>
      <Footer />
    </div>
  );
}