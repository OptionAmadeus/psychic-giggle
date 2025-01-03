import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';

export function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Self AI</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-xl text-gray-600">
            We&apos;re on a mission to democratize intelligent investing by making AI-powered portfolio 
            management accessible to everyone. Our platform combines cutting-edge artificial intelligence 
            with intuitive design to help investors make smarter, data-driven decisions.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}