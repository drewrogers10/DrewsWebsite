import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import blogData from "../content/blog.json";

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  readTime: string;
}

const typedBlogData = blogData as BlogPost[];

const Blog = () => {
  // Sort blog posts by date (newest first)
  const sortedPosts = [...typedBlogData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Header Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog & Insights
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Thoughts on web development, design patterns, and the ever-evolving world of technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {sortedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-8 mb-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2 md:mb-0">
                    <time dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug}`} className="focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded">
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {post.summary}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-accent hover:text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
                >
                  Read more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto text-center mt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-6">
              Get notified when I publish new articles about web development and design.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
