
import React from 'react';
import BlogPost from '@/components/BlogPost';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogPostPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <BlogPost />
      <Footer />
    </div>
  );
}
