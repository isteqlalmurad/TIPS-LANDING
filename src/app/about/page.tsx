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
  Heart,
  Users,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Target,
  Lightbulb,
  Rocket
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AboutPage() {
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
        staggerChildren: 0.2
      }
    }
  };

  const teamMembers = [
    {
      id: 1,
      name: "Dr Andrew O'Malley",
      role: "Project Lead & Entrepreneurial Lead",
      bio: "Andrew is a Senior Lecturer in the School of Medicine and Deputy Programme Director of the Scottish Graduate Entry Medical Programme (ScotGEM). As Deputy Director of Teaching, he brings expertise in anatomy, forensic anthropology, and medical education. Andrew leads case-based learning, medical ethics, and generative AI education initiatives.",
      expertise: ["Medical Education", "Anatomy & Forensic Anthropology", "Case-Based Learning", "Medical Ethics", "Generative AI"],
      photo: "/profiles/Dr Andrew O'Malley.jpeg",
      location: "Scotland, UK",
      email: "andrew@simpatient.ai",
      linkedin: "#",
      achievements: [
        "Deputy Programme Director ScotGEM",
        "Deputy Director of Teaching",
        "Medical Education Specialist"
      ]
    },
    {
      id: 2,
      name: "Mr Sayed Murad",
      role: "Principal Software Engineer",
      bio: "Sayed Murad is an AI engineer and former United Nations Interpreter focused on language equity and breaking communication barriers worldwide. With experience in human-centred AI design and a background in EdTech and MedTech research, he brings practical expertise in building socially impactful AI tools.",
      expertise: ["AI Engineering", "Human-Centred AI Design", "EdTech & MedTech", "Language Equity", "Communication Barriers"],
      photo: "/profiles/Mr Sayed Murad.png",
      location: "Scotland, UK", 
      email: "sayed@simpatient.ai",
      linkedin: "#",
      achievements: [
        "Former UN Interpreter",
        "AI Engineering Expert",
        "Social Impact Technology"
      ]
    },
    {
      id: 3,
      name: "Dr Sandhya Duggal",
      role: "Lecturer in Medical Sociology & Communication Skills",
      bio: "Dr Sandhya Duggal is a Lecturer in Medical Sociology and Communication Skills with over ten years' experience conducting research within the fields of Health, Higher Education and Social Care. She brings extensive expertise in medical communication and social aspects of healthcare.",
      expertise: ["Medical Sociology", "Communication Skills", "Health Research", "Higher Education", "Social Care"],
      photo: "/profiles/Dr Sandhya Duggal.jpeg",
      location: "Scotland, UK",
      email: "sandhya@simpatient.ai",
      linkedin: "#",
      achievements: [
        "10+ years Health Research",
        "Medical Communication Expert",
        "Social Care Specialist"
      ]
    },
    {
      id: 4,
      name: "Dr Xining Wang",
      role: "Post-Doc Researcher & Evaluation Lead",
      bio: "Dr Xining Wang is a Post-Doc Researcher leading our initial evaluations of the Simpatient AI prototype. She brings extensive expertise in evaluating human-computer interactions and Technology Enhanced Learning (TEL), ensuring our platform meets the highest standards of educational effectiveness.",
      expertise: ["Human-Computer Interaction", "Technology Enhanced Learning", "Research Evaluation", "Educational Technology", "User Experience"],
      photo: "/profiles/Dr Xining Wang.webp",
      location: "Scotland, UK",
      email: "xining@simpatient.ai",
      linkedin: "#",
      achievements: [
        "HCI Evaluation Expert",
        "TEL Research Specialist",
        "Educational Technology Researcher"
      ]
    }
  ];

  const companyValues = [
    {
      icon: Target,
      title: "Innovation",
      description: "Pushing the boundaries of medical education through cutting-edge AI technology"
    },
    {
      icon: Heart,
      title: "Patient Care",
      description: "Improving healthcare outcomes by training better medical professionals"
    },
    {
      icon: Lightbulb,
      title: "Excellence",
      description: "Delivering the highest quality educational experiences and tools"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building strong partnerships with medical institutions worldwide"
    }
  ];

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
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary-text">Simpatient AI</span>
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
              <Users className="w-12 h-12 text-accent-purple mr-4" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-text">
                About Simpatient AI
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-secondary-text mb-12 max-w-4xl mx-auto leading-relaxed">
              We&apos;re passionate about transforming medical education through innovative AI technology. 
              Our mission is to create safer, more effective learning experiences for the next generation of healthcare professionals.
            </p>

            {/* Mission Statement */}
            <motion.div
              className="bg-hero-box rounded-2xl p-8 max-w-4xl mx-auto border border-hero-box/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Rocket className="w-10 h-10 text-accent-purple mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary-text mb-4">Our Mission</h2>
              <p className="text-secondary-text leading-relaxed">
                To revolutionize medical education by providing AI-powered virtual patients that enable students 
                to practice clinical skills safely, receive instant feedback, and build confidence before treating real patients. 
                We believe that better-trained medical professionals lead to better patient outcomes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-hero-box/20">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-secondary-text max-w-3xl mx-auto">
              The visionary leaders behind Simpatient AI&apos;s innovative medical education platform
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={fadeInUp}>
                <Card className="bg-hero-box border-hero-box/30 hover:border-accent-purple/50 transition-all duration-300 hover:transform hover:scale-105 h-full">
                  <CardBody className="p-8">
                    {/* Photo and Basic Info */}
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-accent-purple/20">
                        <Image 
                          src={member.photo}
                          alt={member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-primary-text mb-2">{member.name}</h3>
                      <Chip
                        color="primary"
                        variant="flat"
                        className="bg-accent-purple/20 text-accent-purple mb-4"
                      >
                        {member.role}
                      </Chip>
                    </div>

                    {/* Bio */}
                    <p className="text-secondary-text leading-relaxed mb-6 text-center">
                      {member.bio}
                    </p>

                    {/* Expertise */}
                    <div className="mb-6">
                      <h4 className="text-primary-text font-semibold mb-3 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Expertise
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill) => (
                          <Chip
                            key={skill}
                            size="sm"
                            variant="bordered"
                            className="border-accent-purple/30 text-accent-purple text-xs"
                          >
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-primary-text font-semibold mb-3 flex items-center justify-center">
                        <Award className="w-4 h-4 mr-2" />
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {member.achievements.map((achievement) => (
                          <div key={achievement} className="flex items-center justify-center text-secondary-text text-sm">
                            <div className="w-2 h-2 bg-accent-purple rounded-full mr-2" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t border-hero-box/50 pt-6">
                      <div className="flex items-center justify-center space-x-6">
                        <div className="flex items-center text-secondary-text text-sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          {member.location}
                        </div>
                        <Button
                          as={Link}
                          href={`mailto:${member.email}`}
                          size="sm"
                          variant="ghost"
                          className="text-accent-purple hover:bg-accent-purple/20"
                          startContent={<Mail className="w-4 h-4" />}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-4">
              Our Values
            </h2>
            <p className="text-xl text-secondary-text max-w-3xl mx-auto">
              The principles that guide everything we do at Simpatient AI
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {companyValues.map((value) => (
              <motion.div key={value.title} variants={fadeInUp}>
                <Card className="bg-hero-box border-hero-box/30 hover:border-accent-purple/50 transition-colors h-full text-center">
                  <CardBody className="p-6">
                    <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-accent-purple" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary-text mb-3">{value.title}</h3>
                    <p className="text-secondary-text text-sm leading-relaxed">{value.description}</p>
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
            <GraduationCap className="w-16 h-16 text-accent-purple mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-primary-text mb-6">
              Join Us in Transforming Medical Education
            </h2>
            <p className="text-xl text-secondary-text mb-8 leading-relaxed">
              Whether you&apos;re a medical student, educator, or institution, we&apos;re here to support 
              your journey in medical education with cutting-edge AI technology.
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
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}