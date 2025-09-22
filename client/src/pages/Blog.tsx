
import React from 'react';
import BlogSection from '@/components/BlogSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogSection />
      <Footer />
    </div>
  );
}
