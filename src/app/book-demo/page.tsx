'use client';

import {
  Button,
  Link
} from "@heroui/react";
import {
  ArrowLeft
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function BookDemoPage() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#E0F2FE]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 lg:px-8">
          <Link href="/" className="flex items-center space-x-1.5">
            <Image
              src="/logo/SimLogo-dark.png"
              alt="SimPatient AI Logo"
              width={34}
              height={34}
            />
            <span className="font-heading text-base font-semibold text-[#134E4A]">SimPatient AI</span>
          </Link>

          <Button
            variant="ghost"
            startContent={<ArrowLeft className="w-4 h-4" />}
            onClick={() => router.push('/')}
            className="text-[#134E4A] hover:text-[#0891B2] text-sm font-medium transition-colors duration-200"
          >
            Back to Home
          </Button>
        </div>
      </motion.nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Hero */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#134E4A] mb-4">
            Book your demo
          </h1>
          <p className="text-lg text-[#64748B] max-w-xl mx-auto">
            Experience Simpatient AI with a personalized 40-minute demo
          </p>
        </motion.div>

        {/* Calendly Widget */}
        <motion.div
          className="clay-card p-4 sm:p-8 mb-10"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/hello-simpatient/simpatient-meeting"
            style={{ minWidth: '320px', height: '700px' }}
          />
        </motion.div>

        {/* Contact */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <p className="text-sm text-[#64748B]">
            Questions?{' '}
            <Link href="mailto:hello@simpatient.co.uk" className="text-[#0891B2] hover:text-[#0E7490] font-medium transition-colors duration-200">
              Email us
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
