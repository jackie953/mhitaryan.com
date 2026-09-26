import React from 'react';
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata() {
  const title = "Contact | Mhitaryan Consulting";
  return Meta.generate({
    title,
    description: "Get in touch to discuss how we can work together.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: "/contact",
  });
}

export default function Contact() {
  return (
    <div className="w-full">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Contact</h1>
        <div className="prose prose-lg">
          <p className="text-lg mb-8">
            Get in touch to discuss how we can work together.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p>Email: your.email@example.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Location: Your City, Country</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}