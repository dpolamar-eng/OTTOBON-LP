
import React from 'react';
import BlogSection from '@/components/BlogSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blog() {
  return (
    <div className="font-sans text-white bg-black min-h-screen">
      <Header />
      <main className="pt-20">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
