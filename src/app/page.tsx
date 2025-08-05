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
        TIPS AI
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
            <motion.p
              className="atmospheric-text mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Medical training simulation platform
            </motion.p>
            
            <motion.h1
              className="gravity-headline mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              AI Patients for medical
              <br />
              communication training
            </motion.h1>
            
            <motion.div
              className="flex items-center space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 motion-natural px-8 py-6 rounded-full font-medium"
                startContent={<Play className="w-5 h-5" />}
              >
                Experience TIPS AI
              </Button>
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
              See TIPS AI in action
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
              TIPS AI transforms medical education through three immersive interaction modes.
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
                alt="TIPS AI Main Dashboard Interface" 
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
                mode: "Text Conversations",
                description: "Practice diagnostic questioning through natural text exchanges with AI patients"
              },
              {
                icon: Mic,
                mode: "Voice Interactions", 
                description: "Develop communication skills through realistic audio conversations"
              },
              {
                icon: Video,
                mode: "Avatar Sessions",
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
            <h2 className="gravity-subheadline mb-16">
              Trusted by medical institutions worldwide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-24 items-center">
              <div>
                <p className="atmospheric-text-large mb-8">
                  500+ virtual patients spanning all medical specialties.
                  <br />
                  Real-time feedback on clinical reasoning and communication.
                  <br />
                  Evidence-based learning backed by University of St Andrews research.
                </p>
                
                <div className="flex items-center space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                    <div className="atmospheric-text text-sm">Medical Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">500+</div>
                    <div className="atmospheric-text text-sm">AI Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">50+</div>
                    <div className="atmospheric-text text-sm">Institutions</div>
                  </div>
                </div>
                
                <Link href="/academic" className="atmospheric-text hover:text-white inline-flex items-center motion-natural">
                  Explore our research
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
              
              {/* Analytics Interface Screenshot */}
              <div className="relative screenshot-container">
                <div className="relative rounded-2xl overflow-hidden border border-gray-600 shadow-xl max-w-2xl mx-auto">
                  <Image 
                    src="/shots/analytics.png" 
                    alt="TIPS AI Analytics and Feedback Dashboard" 
                    width={800} 
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
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
              TIPS AI adapts to your learning journey
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
                  alt="TIPS AI Personalized Learning Interface" 
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
                size="lg"
                className="bg-white text-black hover:bg-gray-100 motion-natural px-12 py-6 rounded-full font-medium"
                endContent={<ArrowRight className="w-5 h-5" />}
              >
                Start Learning Today
              </Button>
              
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 motion-natural px-8 py-6 rounded-full"
                startContent={<Play className="w-5 h-5" />}
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="content-width py-16 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          <div>
            <p className="atmospheric-text-large font-medium mb-2">TIPS AI</p>
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
            © 2025 TIPS AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}