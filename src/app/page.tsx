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
  ExternalLink
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import CountUp from "react-countup";

// Organic Sphere Component
const OrganicSphere = ({ size, position, gradient, delay = 0 }: {
  size: string;
  position: React.CSSProperties;
  gradient: string;
  delay?: number;
}) => (
  <motion.div
    className={`organic-sphere ${gradient} opacity-30`}
    style={{
      width: size,
      height: size,
      ...position
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 0.6 }}
    transition={{ 
      duration: 2, 
      delay,
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
  />
);

// Navigation Component - Minimal & Atmospheric  
const Navigation = () => (
  <motion.nav 
    className="fixed top-0 w-full z-50 mix-blend-mode-difference"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    <div className="content-width flex justify-between items-center py-8">
      <Link href="/" className="atmospheric-text-large font-medium tracking-tight">
        Simpatient AI
      </Link>
      
      <div className="flex items-center space-x-8">
        <Link 
          href="/academic" 
          className="atmospheric-text hover:text-white motion-natural"
        >
          Research
        </Link>
        <Link 
          href="/about" 
          className="atmospheric-text hover:text-white motion-natural"
        >
          About
        </Link>
        <Button
          as={Link}
          href="https://app.simpatient.co.uk"
          target="_blank"
          variant="ghost"
          size="sm"
          className="atmospheric-text hover:text-white motion-natural"
        >
          Login
        </Button>
      </div>
    </div>
  </motion.nav>
);

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div ref={containerRef} className="page-canvas">
      <Navigation />
      
      {/* Act I: Intrigue - Minimal Impact */}
      <section className="narrative-section act-intrigue full-width relative overflow-hidden">
        <OrganicSphere 
          size="400px"
          position={{ top: "10%", right: "-10%" }}
          gradient="gradient-orb-cool"
          delay={0.8}
        />
        <OrganicSphere 
          size="200px"
          position={{ bottom: "20%", left: "-5%" }}
          gradient="gradient-orb-warm"
          delay={1.2}
        />
        
        <div className="content-width relative z-10">
          <motion.div
            style={{ y: textY }}
            className="min-h-screen flex flex-col justify-start pt-48"
          >
            <motion.h1
              className="gravity-headline mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              AI Patients for medical
              <br />
              communication training
            </motion.h1>
            
            <motion.p
              className="atmospheric-text-large mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Join 700+ future doctors
            </motion.p>
            
            <motion.div
              className="flex items-center space-x-6 mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Button
                as={Link}
                href="/book-demo"
                size="lg"
                className="bg-white text-black hover:bg-gray-100 motion-natural px-8 py-6 rounded-full font-medium"
                startContent={<Play className="w-5 h-5" />}
              >
                Experience Simpatient AI
              </Button>
            </motion.div>

            {/* University of St Andrews Backing */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <p className="atmospheric-text text-sm mb-4">Backed by University of St Andrews</p>
              <div className="flex justify-center">
                <Image
                  src="/shots/st anderws uni.png"
                  alt="University of St Andrews"
                  width={120}
                  height={60}
                  className="opacity-70 hover:opacity-100 motion-natural"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Act II: Demonstration - Video Experience */}
      <section className="narrative-section act-demonstration full-width relative">
        <OrganicSphere 
          size="350px"
          position={{ top: "20%", right: "-12%" }}
          gradient="gradient-orb-cool"
          delay={0.6}
        />
        
        <div className="content-width">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="gravity-subheadline mb-8">
              See Simpatient AI in action
            </h2>
            <p className="atmospheric-text-large max-w-2xl mx-auto">
              Watch how our platform transforms medical training through immersive AI interactions
            </p>
          </motion.div>

          {/* Demo Video */}
          <motion.div
            className="relative mb-32 screenshot-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-700 shadow-2xl max-w-5xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src="https://drive.google.com/file/d/1DASbzrEGUTLWgp-YnJ13zVVVVy5xS2Bx/preview"
                  className="absolute top-0 left-0 w-full h-full"
                  allow="encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Act III: Understanding - Capability Demonstration */}
      <section className="narrative-section act-understanding full-width relative">
        <OrganicSphere 
          size="300px"
          position={{ top: "15%", left: "-8%" }}
          gradient="gradient-orb-warm"
          delay={0}
        />
        
        <div className="content-width">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <p className="atmospheric-text-large mb-16">
              Simpatient AI transforms medical education through three immersive interaction modes.
              <br />
              Each designed to build clinical confidence safely.
            </p>
          </motion.div>

          {/* Product Demonstration Area - Main Interface */}
          <motion.div
            className="relative mb-32 screenshot-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-700 shadow-2xl max-w-5xl mx-auto">
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

          {/* Interaction Modes */}
          <div className="grid md:grid-cols-3 gap-16 mb-32">
            {[
              {
                icon: MessageCircle,
                mode: "Text Chat",
                description: "Practice diagnostic questioning through natural text exchanges with AI patients"
              },
              {
                icon: Mic,
                mode: "Audio Chat", 
                description: "Develop communication skills through realistic audio conversations"
              },
              {
                icon: Video,
                mode: "Video Chat",
                description: "Experience immersive consultations with lifelike AI patient avatars"
              }
            ].map((item, index) => (
              <motion.div
                key={item.mode}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="gravity-subheadline mb-4">{item.mode}</h3>
                <p className="atmospheric-text">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Act IV: Authority - Professional Positioning */}
      <section className="narrative-section act-authority full-width relative">
        <OrganicSphere 
          size="250px"
          position={{ top: "25%", right: "-5%" }}
          gradient="gradient-orb-cool"
          delay={0.5}
        />
        
        <div className="content-width">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="gravity-subheadline mb-16 text-center">
              Proven results
            </h2>
            
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
              {[
                { number: 700, suffix: "+", label: "Medical Students", description: "Training with AI patients" },
                { number: 100, suffix: "+", label: "AI Patients", description: "Across all specialties" },
                { number: 1, suffix: "+", label: "Institution", description: "Trusting our platform" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.2) }}
                  viewport={{ once: true }}
                >
                  <div className="text-5xl font-bold text-white mb-2">
                    <CountUp 
                      end={stat.number} 
                      duration={2.5}
                      delay={0.8 + (index * 0.2)}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                    {stat.suffix}
                  </div>
                  <div className="text-lg font-medium text-white mb-2">{stat.label}</div>
                  <div className="atmospheric-text text-sm">{stat.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Content and Image */}
            <div className="grid lg:grid-cols-5 gap-16 items-center">
              {/* Text Content - 2 columns */}
              <div className="lg:col-span-2">
                <p className="atmospheric-text-large mb-8">
                  Real-time feedback on clinical reasoning and communication skills.
                </p>
                
                <p className="atmospheric-text mb-8">
                  Evidence-based learning methodology developed through University of St Andrews research partnerships.
                </p>
                
                <Link href="/academic" className="atmospheric-text hover:text-white inline-flex items-center motion-natural">
                  View our research
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
              
              {/* Analytics Interface Screenshot - 3 columns */}
              <div className="lg:col-span-3">
                <motion.div 
                  className="relative screenshot-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative rounded-2xl overflow-hidden border border-gray-600 shadow-xl">
                    <Image 
                      src="/shots/analytics.png" 
                      alt="Simpatient AI Analytics and Feedback Dashboard" 
                      width={800} 
                      height={500}
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Act V: Intimacy - Personal Connection */}
      <section className="narrative-section act-intimacy full-width relative">
        <OrganicSphere 
          size="350px"
          position={{ bottom: "10%", left: "-10%" }}
          gradient="gradient-orb-warm"
          delay={0.3}
        />
        
        <div className="content-width">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="gravity-subheadline mb-12">
              Simpatient AI adapts to your learning journey
            </h2>
            
            <p className="atmospheric-text-large max-w-3xl mx-auto mb-16">
              Whether you&apos;re a first-year medical student or preparing for specialization,
              our AI understands your level and creates personalized patient scenarios 
              that challenge you appropriately.
            </p>
            
            {/* Personalization Interface Screenshot */}
            <div className="screenshot-container mb-16">
              <div className="relative rounded-3xl overflow-hidden border border-gray-600 shadow-2xl max-w-5xl mx-auto">
                <Image 
                  src="/shots/personalisation.png" 
                  alt="Simpatient AI Personalized Learning Interface" 
                  width={1200} 
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button
                as={Link}
                href="https://app.simpatient.co.uk"
                target="_blank"
                size="lg"
                className="bg-white text-black hover:bg-gray-100 motion-natural px-12 py-6 rounded-full font-medium"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Start Learning Today
              </Button>
              
              <Button
                as={Link}
                href="/book-demo"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 motion-natural px-8 py-6 rounded-full"
                startContent={<Play className="w-5 h-5" />}
              >
                Book a Personal Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="content-width py-16 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div>
            <p className="atmospheric-text-large font-medium mb-2">Simpatient AI</p>
            <p className="atmospheric-text text-sm">Transforming medical education through AI</p>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link href="/academic" className="atmospheric-text hover:text-white motion-natural">
              Research
            </Link>
            <Link href="/about" className="atmospheric-text hover:text-white motion-natural">
              About
            </Link>
            <Link href="mailto:hello@tipsai.com" className="atmospheric-text hover:text-white motion-natural">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="atmospheric-text text-sm">
            © 2025 Simpatient AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}