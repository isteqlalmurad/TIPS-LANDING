'use client';

import {
  ArrowLeft,
  Calendar,
  Clock,
  Award,
  Newspaper
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Blog Post Type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  date: string;
  readTime: string;
  category: string;
}

// Blog Posts Data
const blogPosts: BlogPost[] = [
  {
    id: "converge-award-2024",
    title: "Simpatient AI Triumphs at Scotland's Converge Awards",
    excerpt: "An evening of celebration as Simpatient AI secures the prestigious KickStart Challenge Entrepreneurial Spirit Award at the Converge Awards 2024.",
    content: [
      "On the evening of October 2nd, 2024, Edinburgh's prestigious Converge Awards ceremony witnessed a historic moment for medical education technology. Among the brightest innovators from Scotland's universities, Simpatient AI emerged victorious, claiming the coveted KickStart Challenge Entrepreneurial Spirit Award.",
      "## A Night to Remember",
      "The atmosphere was electric as Deputy First Minister Kate Forbes joined industry leaders and academic pioneers at the ceremony. With 22 prizes distributed across Scotland's universities and a total prize fund exceeding £400,000, the competition was fierce. Yet Simpatient AI's revolutionary approach to medical training stood out, capturing both the judges' attention and their imagination.",
      "Dr Andrew O'Malley, Senior Lecturer at the University of St Andrews and co-founder of Simpatient AI, took to the stage to accept the award. \"This recognition validates years of dedication to transforming how medical professionals learn,\" he shared with the audience. \"But more importantly, it acknowledges the critical role AI will play in shaping healthcare education for generations to come.\"",
      "## The Innovation Behind the Award",
      "What makes Simpatient AI exceptional isn't just its cutting-edge technology—it's the vision behind it. The platform offers medical students a safe, scalable environment to practice their clinical skills through AI-powered virtual patients. Supporting text, voice, video, and even extended reality interfaces, it dramatically reduces the dependency on human actors while maintaining the authenticity crucial for effective learning.",
      "Built on a bespoke AI model trained using real clinical interactions, Simpatient AI provides data-driven learning experiences that adapt to each student's needs. Medical schools and healthcare training providers worldwide can now license this technology, bringing world-class training to institutions that previously lacked resources for comprehensive simulation programs.",
      "## Scotland's Commitment to Innovation",
      "The award comes at a pivotal time. Converge has secured a record £1.26 million funding commitment from the Scottish Funding Council over the next three years, alongside a strategic partnership with Scottish Enterprise. This collaboration creates stronger pathways for university entrepreneurs, supporting them from initial concept through to commercial success.",
      "Adam Kosterka, Executive Director of Converge, captured the spirit of the evening: \"At Converge, we believe Scotland's universities are home to the next generation of world-changing innovations. This year's winners exemplify what's possible when academic expertise meets entrepreneurial ambition.\"",
      "## Looking Ahead",
      "For the Simpatient AI team, the Converge Award represents more than recognition—it's a launchpad. The prize funding will accelerate platform development, expand partnerships with medical schools, and most importantly, impact the training of thousands of future healthcare professionals.",
      "As medical education faces mounting pressures—from capacity constraints to the need for more diverse training scenarios—Simpatient AI offers a glimpse of the future. A future where technology doesn't replace human connection in medicine, but enhances it, ensuring every medical professional enters practice with confidence, competence, and compassion."
    ],
    image: "/blogpics/Andrew-OMalley-winner-of-KickStart-ES-prize-with-Derek-Watson-from-St.-Andrews-University-with-Kate-Forbes-MSP-and-Adam-Kosterka-Converge-Director-2048x1365.jpg",
    date: "October 2, 2024",
    readTime: "4 min read",
    category: "Awards & Recognition"
  }
];

export default function BlogPage() {
  const router = useRouter();
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const stagger = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const handlePostClick = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  const expandedPost = expandedPostId ? blogPosts.find(p => p.id === expandedPostId) : null;

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (expandedPostId) {
                  window.location.href = '/blog';
                } else {
                  router.push('/');
                }
              }}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#134E4A] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{expandedPostId ? 'Back to Posts' : 'Back to Home'}</span>
            </button>

            <div className="flex items-center space-x-2">
              <Image
                src="/logo/SimLogo-dark.png"
                alt="SimPatient AI Logo"
                width={30}
                height={30}
              />
              <span className="text-base sm:text-lg font-bold text-[#134E4A]">Simpatient AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Only show when not expanded */}
      {!expandedPostId && (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <div className="w-11 h-11 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                  <Newspaper className="w-6 h-6 text-[#0891B2]" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#134E4A] text-center sm:text-left">
                  Latest News
                </h1>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid or Expanded Post */}
      <section className={`${expandedPostId ? 'py-12' : 'py-20'} px-4 sm:px-6 lg:px-8 ${!expandedPostId ? 'bg-white' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {expandedPostId && expandedPost ? (
            // Expanded Post View
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="clay-card clay-card-hover">
                <div className="p-8 md:p-12">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE] rounded-full">
                      {expandedPost.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-[#134E4A] mb-6 leading-tight">
                    {expandedPost.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-[#64748B]">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{expandedPost.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{expandedPost.readTime}</span>
                    </div>
                  </div>

                  {/* Featured Image - Full Size */}
                  <div className="relative w-full mb-8 rounded-2xl overflow-hidden border border-[#E0F2FE]">
                    <Image
                      src={expandedPost.image}
                      alt={expandedPost.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    {expandedPost.content.map((paragraph, index) => {
                      if (paragraph.startsWith('##')) {
                        return (
                          <h2 key={index} className="font-heading text-2xl md:text-3xl font-light text-[#134E4A] mt-12 mb-6">
                            {paragraph.replace('##', '').trim()}
                          </h2>
                        );
                      }
                      return (
                        <p key={index} className="text-[#64748B] text-lg leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <motion.div
              className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <div
                    className="clay-card clay-card-hover cursor-pointer h-full transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => handlePostClick(post.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handlePostClick(post.id);
                      }
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-xs bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE] rounded-full">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-light text-[#134E4A] mb-3 leading-tight">
                        {post.title}
                      </h3>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-[#64748B] text-sm mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Excerpt */}
                      <p className="text-[#64748B] text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action - Only show when not expanded */}
      {!expandedPostId && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0FDFA]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-11 h-11 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-6 h-6 text-[#0891B2]" />
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-6">
                Experience Simpatient AI
              </h2>
              <p className="text-xl text-[#64748B] mb-8 leading-relaxed">
                Join hundreds of medical students already transforming their clinical skills with AI-powered virtual patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/')}
                  className="bg-[#0891B2] text-white hover:bg-[#0E7490] font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
                >
                  Explore Platform
                </button>
                <Link
                  href="/book-demo"
                  className="border-2 border-[#E0F2FE] text-[#0891B2] hover:bg-[#F0FDFA] font-semibold px-8 py-3 rounded-xl transition-colors duration-200 inline-block text-center"
                >
                  Book a Demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
