'use client';

import {
  ExternalLink,
  BookOpen,
  Users,
  Calendar,
  Award,
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AcademicPage() {
  const router = useRouter();

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

  const publications = [
    {
      id: 1,
      title: "Development and Innovation in a New Distributed Medical Programme",
      authors: ["University of St Andrews Research Team"],
      year: "2024",
      journal: "Medical Education Research",
      category: "Medical Education Innovation",
      description: "Research on distributed medical education programs and innovative teaching methodologies in medical training.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/development-and-innovation-in-a-new-distributed-medical-programme",
      tags: ["Medical Education", "Distributed Learning", "Innovation"]
    },
    {
      id: 2,
      title: "Enhancing Diagnostic Accuracy of Ophthalmological Conditions with AI",
      authors: ["St Andrews Medical Research Group"],
      year: "2024",
      journal: "Digital Health & AI",
      category: "AI in Healthcare",
      description: "Investigation into using artificial intelligence to improve diagnostic accuracy in ophthalmological conditions and clinical decision-making.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/enhancing-diagnostic-accuracy-of-ophthalmological-conditions-with",
      tags: ["AI", "Ophthalmology", "Diagnostic Accuracy"]
    },
    {
      id: 3,
      title: "Enhancing Undergraduate Clinical Communication Teaching and Learning",
      authors: ["Clinical Education Research Team"],
      year: "2024",
      journal: "Clinical Education Review",
      category: "Clinical Communication",
      description: "Study on improving clinical communication skills training for undergraduate medical students through innovative teaching methods.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/enhancing-undergraduate-clinical-communication-teaching-and-learn",
      tags: ["Clinical Communication", "Medical Students", "Teaching Methods"]
    },
    {
      id: 4,
      title: "Medical Students and Educators' Opinions of Teleconsultation in Practice",
      authors: ["Telehealth Research Group"],
      year: "2024",
      journal: "Telemedicine & Digital Health",
      category: "Telehealth",
      description: "Research examining perspectives of medical students and educators on teleconsultation practices and their integration into medical education.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/medical-students-and-educators-opinions-of-teleconsultation-in-pr-2",
      tags: ["Teleconsultation", "Medical Education", "Digital Health"]
    },
    {
      id: 5,
      title: "Quality Assurance and Validity of AI-Generated Single Best Answer Questions",
      authors: ["Assessment & AI Research Team"],
      year: "2024",
      journal: "Educational Assessment & AI",
      category: "AI in Assessment",
      description: "Analysis of quality assurance measures and validity of AI-generated single best answer questions for medical examinations.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/quality-assurance-and-validity-of-ai-generated-single-best-answer",
      tags: ["AI Assessment", "Question Generation", "Quality Assurance"]
    },
    {
      id: 6,
      title: "Solving Educational Capacity Challenges with an AI-Powered Patient Simulator",
      authors: ["Medical Simulation Research Group"],
      year: "2024",
      journal: "Simulation in Healthcare",
      category: "Medical Simulation",
      description: "Research on addressing educational capacity limitations in medical training through AI-powered patient simulation technology.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/solving-educational-capacity-challenges-with-an-ai-powered-patien",
      tags: ["AI Simulation", "Medical Training", "Educational Capacity"]
    },
    {
      id: 7,
      title: "Assessing the Quality of AI-Authored Exam Questions",
      authors: ["Educational Technology Research Team"],
      year: "2024",
      journal: "Computers & Education",
      category: "Educational AI",
      description: "Comprehensive assessment of AI-authored examination questions quality, validity, and effectiveness in medical education contexts.",
      url: "https://research-portal.st-andrews.ac.uk/en/publications/assessing-the-quality-of-ai-authored-exam-questions-2",
      tags: ["AI Education", "Exam Questions", "Quality Assessment"]
    }
  ];

  const categories = [...new Set(publications.map(pub => pub.category))];

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#134E4A] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <div className="flex items-center space-x-2">
              <Image src="/logo/SimLogo-dark.png" alt="SimPatient AI Logo" width={30} height={30} />
              <span className="text-base sm:text-lg font-bold text-[#134E4A]">Simpatient AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <div className="w-11 h-11 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mb-2 sm:mb-0 sm:mr-4">
                <BookOpen className="w-6 h-6 text-[#0891B2]" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#134E4A] text-center sm:text-left">
                Academic Publications
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-[#64748B] mb-8 max-w-4xl mx-auto leading-relaxed">
              Research and publications from the University of St Andrews exploring AI in medical education,
              clinical simulation, and innovative teaching methodologies.
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <div className="text-3xl font-bold text-[#0891B2]">{publications.length}</div>
                <div className="text-[#64748B]">Publications</div>
              </motion.div>
              <motion.div
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <div className="text-3xl font-bold text-[#0891B2]">{categories.length}</div>
                <div className="text-[#64748B]">Research Areas</div>
              </motion.div>
              <motion.div
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <div className="text-3xl font-bold text-[#0891B2]">2024</div>
                <div className="text-[#64748B]">Latest Year</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-2xl font-light text-[#134E4A] mb-4">Research Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE]"
                >
                  {category}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Publications Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {publications.map((publication) => (
              <motion.div key={publication.id} variants={fadeInUp}>
                <div className="clay-card clay-card-hover h-full flex flex-col p-6">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE]">
                      {publication.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#134E4A] mb-3 leading-tight">
                    {publication.title}
                  </h3>

                  {/* Authors and Year */}
                  <div className="flex items-center text-[#64748B] text-sm mb-2">
                    <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{publication.authors.join(", ")}</span>
                  </div>

                  <div className="flex items-center text-[#64748B] text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{publication.year} &bull; {publication.journal}</span>
                  </div>

                  {/* Description */}
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6 flex-grow">
                    {publication.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {publication.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <a
                      href={publication.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#E0F2FE] text-[#0891B2] hover:bg-[#0891B2] hover:text-white hover:border-[#0891B2] transition-all duration-200 text-sm font-medium"
                    >
                      Read Publication
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-11 h-11 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-6 h-6 text-[#0891B2]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-6">
              Research-Backed Innovation
            </h2>
            <p className="text-xl text-[#64748B] mb-8 leading-relaxed">
              Our AI-powered medical training platform is built on cutting-edge research
              from the University of St Andrews, ensuring evidence-based learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-[#0891B2] text-white hover:bg-[#0E7490] font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
                onClick={() => router.push('/')}
              >
                Explore Simpatient AI Platform
              </button>
              <a
                href="https://research-portal.st-andrews.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#E0F2FE] text-[#0891B2] font-semibold px-8 py-3 rounded-xl hover:bg-[#F0FDFA] transition-colors duration-200 inline-block"
              >
                Visit Research Portal
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
