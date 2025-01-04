import React from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { ContactInfo } from "../components/contact/ContactInfo";

export function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our AI-powered portfolio management platform?
            We&apos;re here to help.
          </p>
        </div>

        <ContactInfo />
      </div>
    </PageLayout>
  );
}
