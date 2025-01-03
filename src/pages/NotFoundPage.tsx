import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <Brain className="w-24 h-24 text-blue-600 animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Oops! My AI circuits can&apos;t find that page
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Even with all my artificial intelligence, I couldn&apos;t locate what you&apos;re looking for.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Home className="mr-2 w-5 h-5" />
          Go back home
        </Link>
      </div>
    </div>
  );
}