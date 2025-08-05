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
              TIPS AI
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
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <Calendar className="w-12 h-12 text-accent-purple mr-4" />
                <h1 className="gravity-headline">
                  Book your personal
                  <br />
                  TIPS AI demo
                </h1>
              </div>
              
              <p className="atmospheric-text-large max-w-3xl mx-auto mb-12">
                Experience how AI patients can transform your medical training. 
                Our team will walk you through personalized scenarios tailored to your learning goals.
              </p>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                {[
                  {
                    icon: Clock,
                    title: "30-Minute Session",
                    description: "Focused demo covering all three interaction modes"
                  },
                  {
                    icon: Users,
                    title: "Personal Guidance",
                    description: "One-on-one walkthrough with our medical education experts"
                  },
                  {
                    icon: Calendar,
                    title: "Flexible Scheduling",
                    description: "Choose a time that works with your busy schedule"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + (index * 0.2) }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="gravity-subheadline text-lg mb-2">{feature.title}</h3>
                    <p className="atmospheric-text text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
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

            {/* Bottom CTA */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <p className="atmospheric-text mb-8">
                Questions about TIPS AI? Get in touch with our team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  as={Link}
                  href="mailto:hello@simpatient.co.uk"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 motion-natural px-8 py-6 rounded-full"
                >
                  Email Us
                </Button>
                <Button
                  as={Link}
                  href="/about"
                  size="lg"
                  variant="ghost"
                  className="text-white hover:bg-white/10 motion-natural px-8 py-6 rounded-full"
                >
                  Meet the Team
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}