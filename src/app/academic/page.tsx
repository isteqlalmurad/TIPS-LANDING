'use client';

import { 
  Button, 
  Card, 
  CardBody, 
  Chip,
  Link
} from "@heroui/react";
import { 
  ExternalLink,
  BookOpen,
  Users,
  Calendar,
  Award,
  ArrowLeft,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AcademicPage() {
  const router = useRouter();

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
    <div className="min-h-screen bg-primary-dark">
      {/* Header */}
      <div className="bg-hero-box/30 border-b border-hero-box/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push('/')}
              className="text-secondary-text hover:text-primary-text"
            >
              Back to Home
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-purple rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary-text">TIPS AI</span>
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
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-accent-purple mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text">
                Academic Publications
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-secondary-text mb-8 max-w-4xl mx-auto leading-relaxed">
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
                <div className="text-3xl font-bold text-accent-purple">{publications.length}</div>
                <div className="text-secondary-text">Publications</div>
              </motion.div>
              <motion.div 
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <div className="text-3xl font-bold text-accent-purple">{categories.length}</div>
                <div className="text-secondary-text">Research Areas</div>
              </motion.div>
              <motion.div 
                className="text-center"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
              >
                <div className="text-3xl font-bold text-accent-purple">2024</div>
                <div className="text-secondary-text">Latest Year</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-hero-box/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-primary-text mb-4">Research Areas</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Chip
                  key={category}
                  color="primary"
                  variant="flat"
                  className="bg-accent-purple/20 text-accent-purple border-accent-purple/30"
                >
                  {category}
                </Chip>
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
                <Card className="bg-hero-box border-hero-box/30 hover:border-accent-purple/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <CardBody className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <Chip
                        size="sm"
                        color="primary"
                        variant="flat"
                        className="bg-accent-purple/20 text-accent-purple text-xs"
                      >
                        {publication.category}
                      </Chip>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-primary-text mb-3 leading-tight">
                      {publication.title}
                    </h3>

                    {/* Authors and Year */}
                    <div className="flex items-center text-secondary-text text-sm mb-2">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="truncate">{publication.authors.join(", ")}</span>
                    </div>

                    <div className="flex items-center text-secondary-text text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{publication.year} • {publication.journal}</span>
                    </div>

                    {/* Description */}
                    <p className="text-secondary-text text-sm leading-relaxed mb-6 flex-grow">
                      {publication.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {publication.tags.map((tag) => (
                        <Chip
                          key={tag}
                          size="sm"
                          variant="bordered"
                          className="border-accent-purple/30 text-accent-purple text-xs"
                        >
                          {tag}
                        </Chip>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <Button
                        as={Link}
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="primary"
                        variant="bordered"
                        className="w-full border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-white"
                        endContent={<ExternalLink className="w-4 h-4" />}
                      >
                        Read Publication
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
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
              Research-Backed Innovation
            </h2>
            <p className="text-xl text-secondary-text mb-8 leading-relaxed">
              Our AI-powered medical training platform is built on cutting-edge research 
              from the University of St Andrews, ensuring evidence-based learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                color="primary" 
                className="bg-accent-purple text-white font-semibold px-8 py-3"
                onClick={() => router.push('/')}
              >
                Explore TIPS AI Platform
              </Button>
              <Button 
                size="lg" 
                variant="bordered" 
                className="border-accent-purple text-accent-purple font-semibold px-8 py-3"
                as={Link}
                href="https://research-portal.st-andrews.ac.uk/"
                target="_blank"
              >
                Visit Research Portal
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}