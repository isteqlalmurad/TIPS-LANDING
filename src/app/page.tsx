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
  X
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
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

// Navigation Component - Responsive with Mobile Menu
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 mix-blend-mode-difference"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="content-width flex justify-between items-center py-4 sm:py-8">
        {/* Logo */}
        <Link href="/" className="atmospheric-text-large font-medium tracking-tight flex items-center space-x-0.5">
          <Image
            src="/logo/SimLogo.png"
            alt="Simpatient Logo"
            width={40}
            height={40}
            className="inline-block sm:w-[50px] sm:h-[50px]"
            priority
          />
          <span className="text-lg sm:text-xl">Simpatient</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
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
            className="atmospheric-text hover:text-white motion-natural px-4 py-2"
          >
            Login
          </Button>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden fixed inset-0 top-20 bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-start pt-12 space-y-8">
            <Link 
              href="/academic" 
              className="atmospheric-text-large hover:text-white motion-natural"
              onClick={() => setIsMenuOpen(false)}
            >
              Research
            </Link>
            <Link 
              href="/about" 
              className="atmospheric-text-large hover:text-white motion-natural"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Button
              as={Link}
              href="https://app.simpatient.co.uk"
              target="_blank"
              variant="ghost"
              size="lg"
              className="bg-white text-black hover:bg-gray-100 motion-natural px-8 py-4 rounded-full font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

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
            className="min-h-screen flex flex-col justify-start pt-32 sm:pt-40 items-center px-4"
          >
            {/* Top subtitle - centered */}
            <motion.p
              className="atmospheric-text-large mb-4 text-center max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Join 700+ future doctors
            </motion.p>

            {/* Main title - 5% smaller */}
            <motion.h1
              className="gravity-headline-smaller mb-8 sm:mb-16 text-center px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Building better communication
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>skills with AI Patients
            </motion.h1>
            
            <br />

            {/* Button - centered with equal spacing */}
            <motion.div
              className="flex justify-center mb-8 sm:mb-12 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Button
                as={Link}
                href="/book-demo"
                size="lg"
                className="bg-white text-black hover:bg-gray-100 motion-natural px-6 sm:px-8 py-4 sm:py-6 rounded-full font-medium text-sm sm:text-base"
                startContent={<Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                <span className="hidden sm:inline">Experience Simpatient AI</span>
                <span className="sm:hidden">Try Simpatient AI</span>
              </Button>
            </motion.div>

            {/* University of St Andrews Backing - centered */}
            <motion.div
              className="text-center max-w-2xl"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 mb-16 sm:mb-24 md:mb-32 px-4">
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
            <h2 className="gravity-subheadline mb-16">
              Trusted by the future of medicine
            </h2>
            <br />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 md:gap-24 items-center">
              <div>
                <p className="atmospheric-text-large mb-8">
                  100+ virtual patients spanning all medical specialties.
                  <br />
                  Real-time feedback on clinical reasoning and communication.
                  <br />
                  Evidence-based learning backed by University of St Andrews research.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp 
                        end={700} 
                        duration={2.5}
                        delay={0.5}
                        enableScrollSpy
                        scrollSpyOnce
                      />+
                    </div>
                    <div className="atmospheric-text text-sm">Medical Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp 
                        end={100} 
                        duration={2.5}
                        delay={0.7}
                        enableScrollSpy
                        scrollSpyOnce
                      />+
                    </div>
                    <div className="atmospheric-text text-sm">AI Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp 
                        end={1} 
                        duration={2.5}
                        delay={0.9}
                        enableScrollSpy
                        scrollSpyOnce
                      />+
                    </div>
                    <div className="atmospheric-text text-sm">Institution</div>
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
                    alt="Simpatient AI Analytics and Feedback Dashboard" 
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
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4"
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
                className="bg-white text-black hover:bg-gray-100 motion-natural px-8 sm:px-12 py-4 sm:py-6 rounded-full font-medium text-sm sm:text-base w-full sm:w-auto"
                endContent={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                Start Learning Today
              </Button>
              
              <Button
                as={Link}
                href="/book-demo"
                size="lg"
                variant="ghost"
                className="text-white hover:bg-white/10 motion-natural px-6 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-base w-full sm:w-auto"
                startContent={<Play className="w-4 h-4 sm:w-5 sm:h-5" />}
              >
                <span className="hidden sm:inline">Book a Personal Demo</span>
                <span className="sm:hidden">Book Demo</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="content-width py-16 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 px-4">
          <div>
            <p className="atmospheric-text-large font-medium mb-2">Simpatient AI</p>
            <p className="atmospheric-text text-sm mb-4">Transforming medical education through AI</p>
            <div className="atmospheric-text text-sm">
              <p className="mb-2">Email: <Link href="mailto:hello@simpatient.co.uk" className="hover:text-white motion-natural">hello@simpatient.co.uk</Link></p>
              <p className="leading-relaxed">
                Address: School of Medicine<br />
                University of St Andrews<br />
                N Haugh, St Andrews KY16 9TF
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link href="/academic" className="atmospheric-text hover:text-white motion-natural">
              Research
            </Link>
            <Link href="/about" className="atmospheric-text hover:text-white motion-natural">
              About
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