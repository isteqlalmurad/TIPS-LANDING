'use client';

import {
  Button,
  Link
} from "@heroui/react";
import {
  ArrowRight,
  Play,
  MessageCircle,
  Mic,
  Video,
  ExternalLink,
  Menu,
  X,
  Sparkles,
  Mail,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";

// Animation presets
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const fadeUpTransition = (delay = 0) => ({
  duration: 0.5,
  delay,
  ease: "easeOut" as const,
});

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E0F2FE]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-1.5">
          <Image
            src="/logo/SimLogo.png"
            alt="Simpatient Logo"
            width={34}
            height={34}
          />
          <span className="font-heading text-base font-semibold text-[#134E4A]">Simpatient</span>
        </Link>

        {/* Center - OpenAI Badge (desktop) */}
        <div className="hidden md:flex items-center justify-center flex-1">
          <Link
            href="https://academy.openai.com/public/videos/andrew-omalley-medicine-2025-08-20"
            target="_blank"
            className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#F0FDFA] border border-[#E0F2FE] hover:border-[#0891B2]/30 transition-colors duration-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0891B2]" />
            <span className="text-sm font-medium text-[#0891B2]">Featured by OpenAI Academy 2025</span>
            <ExternalLink className="w-3 h-3 text-[#0891B2]" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/blog" className="text-sm font-medium text-[#134E4A] hover:text-[#0891B2] transition-colors duration-200">
            Blog
          </Link>
          <Link href="/academic" className="text-sm font-medium text-[#134E4A] hover:text-[#0891B2] transition-colors duration-200">
            Research
          </Link>
          <Link href="/about" className="text-sm font-medium text-[#134E4A] hover:text-[#0891B2] transition-colors duration-200">
            About
          </Link>
          <Button
            as={Link}
            href="https://app.simpatient.co.uk"
            target="_blank"
            size="sm"
            className="bg-[#0891B2] text-white hover:bg-[#0E7490] transition-colors duration-200 px-5 py-2 rounded-lg text-sm font-medium"
          >
            Login
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-[#134E4A] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile - OpenAI Badge */}
      <div className="md:hidden px-4 pb-3">
        <Link
          href="https://academy.openai.com/public/videos/andrew-omalley-medicine-2025-08-20"
          target="_blank"
          className="flex items-center justify-center space-x-2 px-4 py-1.5 rounded-full bg-[#F0FDFA] border border-[#E0F2FE] w-full"
        >
          <Sparkles className="w-3 h-3 text-[#0891B2]" />
          <span className="text-xs font-medium text-[#0891B2]">Featured by OpenAI Academy 2025</span>
          <ExternalLink className="w-3 h-3 text-[#0891B2]" />
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-[108px] bg-white/98 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-start pt-12 space-y-8 px-6">
              <Link href="/blog" className="font-heading text-lg text-[#134E4A] hover:text-[#0891B2]" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/academic" className="font-heading text-lg text-[#134E4A] hover:text-[#0891B2]" onClick={() => setIsMenuOpen(false)}>
                Research
              </Link>
              <Link href="/about" className="font-heading text-lg text-[#134E4A] hover:text-[#0891B2]" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Button
                as={Link}
                href="https://app.simpatient.co.uk"
                target="_blank"
                size="lg"
                className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-8 py-3 rounded-xl font-medium w-full max-w-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      <section className="bg-[#F0FDFA] pt-32 sm:pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="font-heading text-lg text-[#0891B2] font-medium mb-4"
            {...fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            Join 700+ future doctors
          </motion.p>

          <motion.h1
            className="font-heading text-3xl sm:text-4xl lg:text-6xl font-light text-[#134E4A] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto"
            {...fadeUp}
            transition={fadeUpTransition(0.2)}
          >
            Building better communication skills with AI Patients
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto mb-8 leading-relaxed"
            {...fadeUp}
            transition={fadeUpTransition(0.3)}
          >
            Practice with realistic AI patients through text, voice, and video interactions. Evidence-based learning backed by University of St Andrews research.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
            {...fadeUp}
            transition={fadeUpTransition(0.4)}
          >
            <Button
              as={Link}
              href="/book-demo"
              size="lg"
              className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-8 py-3 rounded-xl font-medium text-base shadow-clay-sm w-full sm:w-auto"
              startContent={<Play className="w-4 h-4" />}
            >
              Book a Demo
            </Button>
            <Button
              as={Link}
              href="https://app.simpatient.co.uk"
              target="_blank"
              size="lg"
              className="bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2] px-6 py-3 rounded-xl font-medium text-base w-full sm:w-auto"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Start Learning Today
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-12"
            {...fadeUp}
            transition={fadeUpTransition(0.5)}
          >
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-200">
              <Image
                src="/shots/st anderws uni.png"
                alt="University of St Andrews"
                width={100}
                height={50}
                className="h-8 w-auto"
              />
              <span className="text-xs text-[#64748B] font-medium hidden sm:block">Backed by University<br />of St Andrews</span>
            </div>
          </motion.div>

          {/* Hero Screenshot */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="clay-card overflow-hidden">
              <Image
                src="/shots/main_display.png"
                alt="Simpatient AI Main Dashboard Interface"
                width={1200}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF STATS BAR ===== */}
      <section className="bg-white py-12 border-y border-[#E0F2FE]">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center px-4">
          {[
            { end: 700, suffix: "+", label: "Medical Students" },
            { end: 100, suffix: "+", label: "AI Patients" },
            { end: 1, suffix: "+", label: "Institutions" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp}
              transition={fadeUpTransition(i * 0.1)}
            >
              <div className="font-heading text-2xl sm:text-4xl font-bold text-[#0891B2] mb-1">
                <CountUp
                  end={stat.end}
                  duration={2}
                  enableScrollSpy
                  scrollSpyOnce
                />{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-[#64748B] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES / MODALITIES ===== */}
      <section className="bg-[#F0FDFA] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Multi-Modal AI Patient Interactions
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Three immersive interaction modes, each designed to build clinical confidence safely.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                mode: "Text Conversations",
                description: "Practice diagnostic questioning through natural text exchanges with AI patients. Build history-taking skills at your own pace."
              },
              {
                icon: Mic,
                mode: "Voice Interactions",
                description: "Develop communication skills through realistic audio conversations. Practice tone, empathy, and clinical questioning."
              },
              {
                icon: Video,
                mode: "Avatar Sessions",
                description: "Experience immersive consultations with lifelike AI patient avatars. The closest thing to real patient encounters."
              }
            ].map((item, index) => (
              <motion.div
                key={item.mode}
                className="clay-card clay-card-hover p-8 text-center cursor-default"
                {...fadeUp}
                transition={fadeUpTransition(0.1 + index * 0.1)}
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#F0FDFA] border-2 border-[#E0F2FE] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[#0891B2]" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-3">{item.mode}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT DEMO / VIDEO ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              See Simpatient AI in action
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Watch how our platform transforms medical training through immersive AI interactions
            </p>
          </motion.div>

          <motion.div
            className="clay-card overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src="https://drive.google.com/file/d/19Cj5As39RqDO6_Q5OkkMKNQwHY2Daf3Y/preview"
                className="absolute top-0 left-0 w-full h-full"
                allow="encrypted-media"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DIVERSITY ENGINE ===== */}
      <section className="bg-[#F0FDFA] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-12 text-center lg:text-left"
            {...fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            Bring your Patient Scripts to Life
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} transition={fadeUpTransition(0.2)}>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mb-8">
                Create realistic AI patients with just a few prompts. Our state-of-the-art Diversity Engine creates culturally diverse AI patient scenarios aligned to your curriculum. Or use your own patient scripts and bring them to life.
              </p>

              <div className="space-y-5">
                {[
                  { title: "Prompt-Based Generation", desc: "Transform simple descriptions into complex, realistic patient presentations" },
                  { title: "Cultural Diversity", desc: "Generate patients from diverse backgrounds with authentic cultural contexts" },
                  { title: "Curriculum Alignment", desc: "Automatically adapt scenarios to match your learning objectives and level" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#0891B2] rounded-full mt-2.5 flex-shrink-0" />
                    <p className="text-sm text-[#64748B]">
                      <span className="font-semibold text-[#134E4A]">{item.title}:</span> {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="clay-card overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src="/shots/Diversity_Engine.gif"
                alt="Simpatient AI Diversity Engine - Patient Generation Interface"
                width={1200}
                height={900}
                className="w-full h-auto"
                unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== AUTHORITY SECTION ===== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-8">
                Trusted by the future of medicine
              </h2>

              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mb-8">
                100+ virtual patients spanning all medical specialties. Real-time feedback on clinical reasoning and communication. Evidence-based learning backed by University of St Andrews research.
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                {[
                  { end: 700, suffix: "+", label: "Medical Students" },
                  { end: 100, suffix: "+", label: "AI Patients" },
                  { end: 1, suffix: "+", label: "Institution" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-heading text-3xl font-bold text-[#0891B2] mb-1">
                      <CountUp
                        end={stat.end}
                        duration={2}
                        enableScrollSpy
                        scrollSpyOnce
                      />{stat.suffix}
                    </div>
                    <div className="text-xs text-[#64748B] font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/academic"
                className="inline-flex items-center text-[#0891B2] hover:text-[#0E7490] font-medium text-sm transition-colors duration-200"
              >
                Explore our research
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            <motion.div
              className="clay-card overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Image
                src="/shots/analytics.png"
                alt="Simpatient AI Analytics and Feedback Dashboard"
                width={800}
                height={500}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PERSONALIZATION SECTION ===== */}
      <section className="bg-[#F0FDFA] py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-6">
              Adapts to your learning journey
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] max-w-3xl mx-auto mb-12 leading-relaxed">
              If you&apos;re an institution and want your students to practice with AI patients, our AI understands each student&apos;s level and creates personalized patient scenarios for any specialization and skill level.
            </p>
          </motion.div>

          <motion.div
            className="clay-card overflow-hidden mb-12"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Image
              src="/shots/personalisation.png"
              alt="Simpatient AI Personalized Learning Interface"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-white py-16 sm:py-20 border-t border-[#E0F2FE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Ready to transform medical education?
            </h2>
            <p className="text-lg text-[#64748B] mb-8">
              Join 700+ medical students already practising with Simpatient AI.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            {...fadeUp}
            transition={fadeUpTransition(0.2)}
          >
            <Button
              as={Link}
              href="https://app.simpatient.co.uk"
              target="_blank"
              size="lg"
              className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-8 py-3 rounded-xl font-medium text-base shadow-clay-sm w-full sm:w-auto"
              endContent={<ArrowRight className="w-4 h-4" />}
            >
              Start Learning Today
            </Button>
            <Button
              as={Link}
              href="/book-demo"
              size="lg"
              className="bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2] px-6 py-3 rounded-xl font-medium text-base w-full sm:w-auto"
              startContent={<Play className="w-4 h-4" />}
            >
              Book a Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#134E4A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Image
                  src="/logo/SimLogo1.png"
                  alt="Simpatient Logo"
                  width={28}
                  height={28}
                  className="brightness-200"
                />
                <span className="font-heading text-lg font-semibold">Simpatient AI</span>
              </div>
              <p className="text-white/60 text-sm mb-4">Transforming medical education through AI</p>
              <div className="text-white/50 text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <Link href="mailto:hello@simpatient.co.uk" className="hover:text-white transition-colors duration-200">
                    hello@simpatient.co.uk
                  </Link>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>School of Medicine, University of St Andrews<br />N Haugh, St Andrews KY16 9TF</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link href="/blog" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Blog</Link>
              <Link href="/academic" className="text-white/60 hover:text-white text-sm transition-colors duration-200">Research</Link>
              <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors duration-200">About</Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              &copy; 2025 Simpatient AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
