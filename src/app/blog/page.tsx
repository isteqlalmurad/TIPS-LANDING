'use client';

import {
  Button,
  Card,
  CardBody,
  Chip,
  Link
} from "@heroui/react";
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
  },
  {
    id: "st-andrews-pilot-2024",
    title: "Medical Students Embrace AI: St Andrews Pilot Success",
    excerpt: "On October 12th, 2024, medical students at the University of St Andrews School of Medicine participated in an exciting pilot program that's set to revolutionize their training.",
    content: [
      "The morning of October 12th, 2024, marked a turning point in medical education at the University of St Andrews. In a state-of-the-art teaching facility, a group of eager medical students gathered for something unprecedented: their first interaction with Simpatient AI's virtual patient platform.",
      "## The Pilot That Changed Everything",
      "\"I was nervous at first,\" admitted Sarah Chen, a third-year medical student. \"I thought it would feel artificial, like talking to a chatbot. But within minutes, I was completely immersed. The AI patient responded to my questions with realistic symptoms, emotional reactions, and even challenged my diagnostic approach.\"",
      "The pilot program, carefully designed by the Simpatient AI team in collaboration with St Andrews' School of Medicine faculty, focused on clinical communication skills—an area where many students report feeling underprepared. Over the course of the day, students engaged in multiple virtual consultations, each presenting unique challenges and learning opportunities.",
      "## Beyond Traditional Training",
      "Dr Sandhya Duggal, Lecturer in Medical Sociology and Communication Skills, observed the sessions with growing excitement. \"What struck me most was how quickly students overcame their initial hesitation. By their second or third patient interaction, they were treating the experience as seriously as they would a real clinical encounter.\"",
      "The platform's ability to provide immediate, constructive feedback proved particularly valuable. After each consultation, students received detailed analysis of their communication patterns, diagnostic reasoning, and areas for improvement—insights that would typically require extensive debriefing sessions with human supervisors.",
      "## Student Voices",
      "The feedback was overwhelmingly positive. James Mitchell, a second-year student, shared: \"I've always been anxious about patient interactions. This gives me a safe space to practice, make mistakes, and learn without the fear of causing harm. It's transformative.\"",
      "Another student, Priya Patel, highlighted the diversity aspect: \"We encountered patients from different cultural backgrounds, with varying communication styles and health beliefs. That's so important for our training, and something we don't always get enough exposure to.\"",
      "## Faculty Perspectives",
      "The teaching staff were equally impressed. Dr Xining Wang, leading the evaluation of the pilot, noted significant advantages: \"We can now track student progress with unprecedented granularity. The AI doesn't just tell us if a student performed well—it shows us exactly where they excel and where they need support.\"",
      "Professor Thomson, Head of Clinical Skills, emphasized the scalability: \"We've struggled with capacity constraints for years. We simply can't provide every student with enough practice opportunities using traditional methods. Simpatient AI doesn't replace our simulated patient programs—it complements them brilliantly.\"",
      "## The Technical Excellence",
      "Students were particularly impressed by the platform's natural language processing capabilities. The AI patients understood medical terminology, responded to follow-up questions appropriately, and even displayed realistic emotional responses when discussing sensitive topics.",
      "The voice interaction feature received special praise. \"Hearing the patient's tone, their hesitations, their anxiety—it added a layer of realism I didn't expect,\" explained one participant. \"It's not just about what they say, but how they say it.\"",
      "## Looking Forward",
      "By day's end, what started as a pilot program felt like a preview of the future. Students left the session energized, eager to practice more, and confident that their clinical skills were developing at an accelerated pace.",
      "The School of Medicine has already begun discussions about integrating Simpatient AI into the core curriculum for the coming academic year. \"This pilot exceeded our expectations,\" confirmed Dr Andrew O'Malley. \"Watching students grow in confidence, seeing their communication skills sharpen in real-time—this is why we built Simpatient AI.\"",
      "## The Bigger Picture",
      "As medical education worldwide grapples with capacity challenges, diversity requirements, and the need for more personalized learning, the St Andrews pilot offers a compelling case study. Technology and humanity, working together to create better healthcare professionals.",
      "For the students who participated, October 12th wasn't just another training session—it was the day they glimpsed the future of medical education. And they loved every moment of it."
    ],
    image: "/blogpics/sample.webp",
    date: "October 12, 2024",
    readTime: "5 min read",
    category: "Pilot Programs"
  }
];

export default function BlogPage() {
  const router = useRouter();
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
    <div className="min-h-screen bg-primary-dark">
      {/* Header */}
      <div className="bg-hero-box/30 border-b border-hero-box/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onClick={() => {
                if (expandedPostId) {
                  window.location.href = '/blog';
                } else {
                  router.push('/');
                }
              }}
              className="text-secondary-text hover:text-primary-text"
            >
              {expandedPostId ? 'Back to Posts' : 'Back to Home'}
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="text-base sm:text-lg font-bold text-primary-text">Simpatient AI</span>
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
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center">
                <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-accent-purple mb-2 sm:mb-0 sm:mr-4" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text text-center sm:text-left">
                  Latest News
                </h1>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid or Expanded Post */}
      <section className={`${expandedPostId ? 'py-12' : 'py-20'} px-4 sm:px-6 lg:px-8 ${!expandedPostId ? 'bg-hero-box/20' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {expandedPostId && expandedPost ? (
            // Expanded Post View
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-hero-box border-hero-box/30">
                <CardBody className="p-8 md:p-12">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <Chip
                      color="primary"
                      variant="flat"
                      className="bg-accent-purple/20 text-accent-purple"
                    >
                      {expandedPost.category}
                    </Chip>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-text mb-6 leading-tight">
                    {expandedPost.title}
                  </h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 mb-8 text-secondary-text">
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
                  <div className="relative w-full mb-8 rounded-2xl overflow-hidden border border-hero-box/50">
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
                  <div className="prose prose-invert prose-lg max-w-none">
                    {expandedPost.content.map((paragraph, index) => {
                      if (paragraph.startsWith('##')) {
                        return (
                          <h2 key={index} className="text-2xl md:text-3xl font-bold text-primary-text mt-12 mb-6">
                            {paragraph.replace('##', '').trim()}
                          </h2>
                        );
                      }
                      return (
                        <p key={index} className="text-secondary-text text-lg leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ) : (
            // Blog Posts Grid
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card
                    className="bg-hero-box border-hero-box/30 hover:border-accent-purple/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer h-full"
                    isPressable
                    onPress={() => handlePostClick(post.id)}
                  >
                    <CardBody className="p-0">
                      {/* Image Section - Smaller, preserving aspect ratio */}
                      <div className="relative w-full h-64 overflow-hidden">
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
                          <Chip
                            size="sm"
                            color="primary"
                            variant="flat"
                            className="bg-accent-purple/20 text-accent-purple text-xs"
                          >
                            {post.category}
                          </Chip>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-primary-text mb-3 leading-tight">
                          {post.title}
                        </h3>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-secondary-text text-sm mb-4">
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
                        <p className="text-secondary-text text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action - Only show when not expanded */}
      {!expandedPostId && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-hero-box/30">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 text-accent-purple mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-6">
                Experience Simpatient AI
              </h2>
              <p className="text-xl text-secondary-text mb-8 leading-relaxed">
                Join hundreds of medical students already transforming their clinical skills with AI-powered virtual patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  color="primary"
                  className="bg-accent-purple text-white font-semibold px-8 py-3"
                  onClick={() => router.push('/')}
                >
                  Explore Platform
                </Button>
                <Button
                  size="lg"
                  variant="bordered"
                  className="border-accent-purple text-accent-purple font-semibold px-8 py-3"
                  as={Link}
                  href="/book-demo"
                >
                  Book a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
