import React from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { FAQSection } from "../components/faq/FAQSection";
import { HelpCircle } from "lucide-react";

export function FAQPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our AI-powered portfolio
            management platform.
          </p>
        </div>
        <FAQSection />
      </div>
    </PageLayout>
  );
}
