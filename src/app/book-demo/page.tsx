'use client';

import { 
  Button,
  Link
} from "@heroui/react";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Organic Sphere Component (reused from main page)
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

export default function BookDemoPage() {
  const router = useRouter();

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="page-canvas">
      {/* Atmospheric Background - Extends the narrative */}
      <section className="narrative-section act-intimacy full-width relative min-h-screen">
        <OrganicSphere 
          size="400px"
          position={{ top: "10%", right: "-15%" }}
          gradient="gradient-orb-cool"
          delay={0.3}
        />
        <OrganicSphere 
          size="250px"
          position={{ bottom: "15%", left: "-8%" }}
          gradient="gradient-orb-warm"
          delay={0.8}
        />

        {/* Navigation */}
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
            
            <Button
              variant="ghost"
              startContent={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push('/')}
              className="atmospheric-text hover:text-white motion-natural"
            >
              Back to Home
            </Button>
          </div>
        </motion.nav>

        <div className="content-width relative z-10">
          <div className="min-h-screen flex flex-col justify-start pt-32">
            
            {/* Hero Section */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <h1 className="gravity-headline mb-8">
                Book your demo
              </h1>
              
              <p className="atmospheric-text-large max-w-2xl mx-auto">
                Experience Simpatient AI with a personalized 30-minute demo
              </p>
            </motion.div>

            {/* Calendly Widget Container */}
            <motion.div
              className="max-w-4xl mx-auto w-full mb-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              {/* Atmospheric Container for Calendly */}
              <div className="relative rounded-3xl overflow-hidden border border-gray-600 shadow-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 pointer-events-none" />
                
                {/* Calendly Embed */}
                <div className="relative z-10">
                  <div 
                    className="calendly-inline-widget" 
                    data-url="https://calendly.com/hello-simpatient/30min" 
                    style={{ minWidth: '320px', height: '700px' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Simple Contact */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <p className="atmospheric-text text-sm">
                Questions? <Link href="mailto:hello@simpatient.co.uk" className="text-white hover:opacity-80 motion-natural">Email us</Link>
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}