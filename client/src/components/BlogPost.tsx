
import React from 'react';
import { useLocation, useRoute } from 'wouter';
import { useAnimation } from '@/hooks/use-animation';
import { blogPosts } from './BlogSection';

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute('/blog/:id');
  
  const sectionRef = useAnimation('animate-fade-in');
  const contentRef = useAnimation('animate-slide-up');

  const post = blogPosts.find(p => p.id === params?.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => setLocation('/blog')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Course Updates': 'bg-blue-100 text-blue-800 border-blue-200',
      'Career Tips': 'bg-green-100 text-green-800 border-green-200',
      'AI Trends': 'bg-purple-100 text-purple-800 border-purple-200',
      'Student Success': 'bg-amber-100 text-amber-800 border-amber-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const shareUrl = `${window.location.origin}/blog/${post.id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50" ref={sectionRef}>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => setLocation('/')}
              className="text-gray-500 hover:text-gray-700"
            >
              Home
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <button
              onClick={() => setLocation('/blog')}
              className="text-gray-500 hover:text-gray-700"
            >
              Blog
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="text-gray-900 font-medium truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Button */}
          <button
            onClick={() => setLocation('/blog')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Blog
          </button>

          {/* Article Header */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200" ref={contentRef}>
            {/* Hero Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8">
              {/* Meta Information */}
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {post.title}
              </h1>

              {/* Social Sharing */}
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Share:</span>
                <button 
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank')}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button 
                  onClick={() => navigator.share?.({ title: post.title, url: shareUrl })}
                  className="text-gray-600 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Bio */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    O
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{post.author}</h4>
                    <p className="text-gray-600 text-sm">Expert team at OttoBon Academy, dedicated to providing cutting-edge AI education and career guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 cursor-pointer group hover:shadow-lg transition-all duration-300"
                    onClick={() => setLocation(`/blog/${relatedPost.id}`)}
                  >
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getCategoryColor(relatedPost.category)}`}>
                        {relatedPost.category}
                      </span>
                      <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Comments Placeholder */}
          <div className="mt-16">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
              <div className="text-center py-12">
                <svg className="mx-auto w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Comments Coming Soon</h4>
                <p className="text-gray-600">We're working on adding a comment system. Stay tuned for updates!</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Career with AI?</h3>
              <p className="text-blue-100 mb-6">Join our comprehensive AI courses and become part of the next generation of tech leaders.</p>
              <button
                onClick={() => setLocation('/enroll')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition shadow-md hover:shadow-lg"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
