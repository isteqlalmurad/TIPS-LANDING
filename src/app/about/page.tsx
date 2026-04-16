'use client';

import {
  Button,
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

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const fadeUpItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const stagger = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  const router = useRouter();

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
      achievements: ["Deputy Programme Director ScotGEM", "Deputy Director of Teaching", "Medical Education Specialist"]
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
      achievements: ["Former UN Interpreter", "AI Engineering Expert", "Social Impact Technology"]
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
      achievements: ["10+ years Health Research", "Medical Communication Expert", "Social Care Specialist"]
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
      achievements: ["HCI Evaluation Expert", "TEL Research Specialist", "Educational Technology Researcher"]
    }
  ];

  const companyValues = [
    { icon: Target, title: "Innovation", description: "Pushing the boundaries of medical education through cutting-edge AI technology" },
    { icon: Heart, title: "Patient Care", description: "Improving healthcare outcomes by training better medical professionals" },
    { icon: Lightbulb, title: "Excellence", description: "Delivering the highest quality educational experiences and tools" },
    { icon: Users, title: "Collaboration", description: "Building strong partnerships with medical institutions worldwide" },
  ];

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E0F2FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push('/')}
              className="text-[#134E4A] hover:text-[#0891B2] text-sm font-medium transition-colors duration-200"
            >
              Back to Home
            </Button>
            <Link href="/" className="flex items-center space-x-1.5">
              <Image src="/logo/SimLogo-dark.png" alt="SimPatient AI Logo" width={30} height={30} />
              <span className="font-heading text-base font-semibold text-[#134E4A]">Simpatient AI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-11 h-11 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#0891B2]" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#134E4A]">
                About Simpatient AI
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-[#64748B] mb-12 max-w-3xl mx-auto leading-relaxed">
              We&apos;re passionate about transforming medical education through innovative AI technology. Our mission is to create safer, more effective learning experiences for the next generation of healthcare professionals.
            </p>

            {/* Mission Card */}
            <motion.div
              className="clay-card p-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-5 h-5 text-[#0891B2]" />
              </div>
              <h2 className="font-heading text-xl font-semibold text-[#134E4A] mb-4">Our Mission</h2>
              <p className="text-[#64748B] leading-relaxed">
                To revolutionize medical education by providing AI-powered virtual patients that enable students to practice clinical skills safely, receive instant feedback, and build confidence before treating real patients. We believe that better-trained medical professionals lead to better patient outcomes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">Meet Our Team</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              The visionary leaders behind Simpatient AI&apos;s innovative medical education platform
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {teamMembers.map((member) => (
              <motion.div key={member.id} variants={fadeUpItem} className="clay-card clay-card-hover p-8">
                {/* Photo + Info */}
                <div className="text-center mb-6">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#E0F2FE]">
                    <Image src={member.photo} alt={member.name} width={112} height={112} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-2">{member.name}</h3>
                  <Chip color="primary" variant="flat" className="bg-[#F0FDFA] text-[#0891B2] border border-[#E0F2FE] mb-4">
                    {member.role}
                  </Chip>
                </div>

                <p className="text-[#64748B] text-sm leading-relaxed mb-6 text-center">{member.bio}</p>

                {/* Expertise */}
                <div className="mb-6">
                  <h4 className="text-[#134E4A] font-semibold text-sm mb-3 flex items-center justify-center">
                    <Briefcase className="w-3.5 h-3.5 mr-1.5" /> Expertise
                  </h4>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.expertise.map((skill) => (
                      <Chip key={skill} size="sm" variant="bordered" className="border-[#E0F2FE] text-[#0891B2] text-xs">{skill}</Chip>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-[#134E4A] font-semibold text-sm mb-3 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 mr-1.5" /> Achievements
                  </h4>
                  <div className="space-y-1.5">
                    {member.achievements.map((a) => (
                      <div key={a} className="flex items-center justify-center text-[#64748B] text-xs">
                        <div className="w-1.5 h-1.5 bg-[#0891B2] rounded-full mr-2" />{a}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="border-t border-[#E0F2FE] pt-5">
                  <div className="flex items-center justify-center gap-4">
                    <span className="flex items-center text-[#64748B] text-xs">
                      <MapPin className="w-3.5 h-3.5 mr-1" />{member.location}
                    </span>
                    <Button
                      as={Link}
                      href={`mailto:${member.email}`}
                      size="sm"
                      variant="ghost"
                      className="text-[#0891B2] hover:bg-[#F0FDFA] text-xs"
                      startContent={<Mail className="w-3.5 h-3.5" />}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp} transition={{ duration: 0.5 }}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">Our Values</h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">The principles that guide everything we do at Simpatient AI</p>
          </motion.div>

          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" variants={stagger} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {companyValues.map((value) => (
              <motion.div key={value.title} variants={fadeUpItem} className="clay-card clay-card-hover p-6 text-center">
                <div className="w-12 h-12 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-[#0891B2]" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#134E4A] mb-2">{value.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E0F2FE]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-[#F0FDFA] border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-7 h-7 text-[#0891B2]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Join Us in Transforming Medical Education
            </h2>
            <p className="text-lg text-[#64748B] mb-8 leading-relaxed">
              Whether you&apos;re a medical student, educator, or institution, we&apos;re here to support your journey in medical education with cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-[#0891B2] text-white hover:bg-[#0E7490] font-medium px-8 py-3 rounded-xl"
                onClick={() => router.push('/')}
              >
                Explore Platform
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="border-2 border-[#E0F2FE] text-[#0891B2] hover:border-[#0891B2] font-medium px-8 py-3 rounded-xl"
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
