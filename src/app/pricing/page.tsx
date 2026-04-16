'use client';

import {
  Button,
  Link
} from "@heroui/react";
import {
  ArrowLeft,
  Check,
  X as XIcon,
  AlertTriangle,
  Users,
  Mic,
  Shield,
  HeadphonesIcon,
  Sparkles,
  BookOpen,
  FileText,
  Clock,
  Building2,
  Zap,
  GraduationCap,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

// Pricing tiers data
const tiers = [
  {
    name: "Pilot",
    price: "30,000",
    period: "/year",
    consultations: "6,000+",
    description: "Perfect for getting started with AI patient simulation",
    highlighted: false,
    features: {
      patients: ["Standard Patient Library"],
      feedback: [],
      support: ["Email Support"],
      extras: [
        "Bespoke SimPatient LLM",
        "SSO Authentication",
      ],
    },
  },
  {
    name: "Standard",
    price: "60,000",
    period: "/year",
    consultations: "14,000+",
    description: "Ideal for departments scaling simulation training",
    highlighted: true,
    features: {
      patients: [
        "Everything in Pilot, plus:",
        "Custom Patients (choose from 20 voices and 15 faces)",
      ],
      feedback: [
        "Individualised & Instant Calgary Cambridge Feedback",
        "PDF Feedback Export",
      ],
      support: ["Priority Support"],
      extras: [
        "Bespoke SimPatient LLM",
        "SSO Authentication",
      ],
    },
  },
  {
    name: "SimCentre",
    price: "90,000",
    period: "/year",
    consultations: "23,000+",
    description: "Full-scale deployment for simulation centres",
    highlighted: false,
    features: {
      patients: [
        "Everything in Standard, plus:",
        "Custom Patients (choose from 100s of voices and faces)",
        "Random Patient Generator, powered by Diversity Engine",
      ],
      feedback: [
        "Custom Feedback Rubrics",
        "ePortfolio Integration (Coming Soon)",
      ],
      support: [
        "Dedicated Support Manager",
        "Annual staff training workshops",
      ],
      extras: [
        "Bespoke SimPatient LLM",
        "SSO Authentication",
      ],
    },
  },
  {
    name: "Enterprise+",
    price: "Contact",
    period: "",
    consultations: "Unlimited",
    description: "Bespoke solutions for large-scale institutions",
    highlighted: false,
    isEnterprise: true,
    features: {
      patients: [
        "Everything in SimCentre, plus:",
        "Custom-built patient scenarios",
        "Unlimited consultations",
      ],
      feedback: [
        "Fully custom rubrics & reporting",
        "LMS & ePortfolio integrations",
      ],
      support: [
        "Dedicated Support Manager",
        "On-site training & workshops",
        "SLA guarantees",
      ],
      extras: [
        "Bespoke SimPatient LLM",
        "SSO Authentication",
        "Custom API access",
      ],
    },
  },
];

// Comparison data
const comparisonRows = [
  {
    category: "Cost",
    traditional: { value: "~£55+", sub: "per session (including hidden overheads)" },
    simpatient: { value: "~£10", sub: "per session (all-inclusive)" },
  },
  {
    category: "Faculty",
    traditional: { value: "Required", sub: "1:1 faculty presence for observation & feedback" },
    simpatient: { value: "Not required", sub: "Automated feedback rubrics enable independent practice" },
  },
  {
    category: "Availability",
    traditional: { value: "Business hours", sub: "Must be scheduled in physical labs" },
    simpatient: { value: "24/7 access", sub: "Students practice anytime, anywhere via browser" },
  },
  {
    category: "Consistency",
    traditional: { value: "Variable", sub: "Actor performance varies; hard to standardize across cohorts" },
    simpatient: { value: "Standardized", sub: "Every student gets the same high-fidelity clinical baseline" },
  },
  {
    category: "Scalability",
    traditional: { value: "Limited", sub: "Constrained by actor and lab availability" },
    simpatient: { value: "Unlimited", sub: "Scales to any number of students simultaneously" },
  },
  {
    category: "Feedback",
    traditional: { value: "Delayed", sub: "Depends on faculty availability for debrief" },
    simpatient: { value: "Instant", sub: "Immediate Calgary Cambridge feedback after each session" },
  },
];

export default function PricingPage() {
  const router = useRouter();

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
            <Image src="/logo/SimLogo-dark.png" alt="SimPatient AI Logo" width={34} height={34} />
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

      {/* ===== HERO ===== */}
      <section className="pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <p className="font-heading text-lg text-[#0891B2] font-medium mb-3">Pricing</p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light text-[#134E4A] mb-4">
              Plans that scale with your institution
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto">
              From pilot programmes to full-scale simulation centres. All plans include our bespoke SimPatient LLM, fine-tuned on thousands of clinical consultations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== PRICING TIERS ===== */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className={`clay-card relative flex flex-col ${
                  tier.highlighted
                    ? 'border-[#0891B2] ring-1 ring-[#0891B2]/20'
                    : ''
                }`}
                {...fadeUp}
                transition={fadeUpTransition(0.1 + index * 0.08)}
              >
                {/* Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#0891B2] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Header */}
                  <div className="text-center mb-6 pb-6 border-b border-[#E0F2FE]">
                    <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-2">{tier.name}</h3>
                    <div className="mb-2">
                      {tier.isEnterprise ? (
                        <span className="font-heading text-3xl font-bold text-[#0891B2]">Contact us</span>
                      ) : (
                        <>
                          <span className="font-heading text-3xl font-bold text-[#0891B2]">£{tier.price}</span>
                          <span className="text-[#64748B] text-sm">{tier.period}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B]">{tier.description}</p>
                  </div>

                  {/* Consultations */}
                  <div className="bg-[#F0FDFA] rounded-xl p-3 mb-6 text-center border border-[#E0F2FE]">
                    <div className="flex items-center justify-center gap-2">
                      <Mic className="w-4 h-4 text-[#0891B2]" />
                      <span className="font-heading text-lg font-bold text-[#0891B2]">{tier.consultations}</span>
                    </div>
                    <span className="text-xs text-[#64748B]">audio consultations</span>
                  </div>

                  {/* Features */}
                  <div className="flex-1 space-y-5">
                    {/* Patients */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#134E4A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#0891B2]" /> Patients
                      </h4>
                      <ul className="space-y-1.5">
                        {tier.features.patients.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#64748B]">
                            <Check className="w-3.5 h-3.5 text-[#0891B2] mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Feedback */}
                    {tier.features.feedback.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-[#134E4A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-[#0891B2]" /> Feedback
                        </h4>
                        <ul className="space-y-1.5">
                          {tier.features.feedback.map((f, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-[#64748B]">
                              <Check className="w-3.5 h-3.5 text-[#0891B2] mt-0.5 flex-shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Support */}
                    <div>
                      <h4 className="text-xs font-semibold text-[#134E4A] uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <HeadphonesIcon className="w-3.5 h-3.5 text-[#0891B2]" /> Support
                      </h4>
                      <ul className="space-y-1.5">
                        {tier.features.support.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[#64748B]">
                            <Check className="w-3.5 h-3.5 text-[#0891B2] mt-0.5 flex-shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-[#E0F2FE]">
                    <Button
                      as={Link}
                      href="/book-demo"
                      className={`w-full rounded-xl font-medium text-sm py-2.5 ${
                        tier.highlighted
                          ? 'bg-[#0891B2] text-white hover:bg-[#0E7490]'
                          : tier.isEnterprise
                            ? 'bg-[#134E4A] text-white hover:bg-[#134E4A]/90'
                            : 'bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2]'
                      }`}
                    >
                      {tier.isEnterprise ? 'Contact Sales' : 'Book a Demo'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Shared features bar */}
          <motion.div
            className="mt-8 clay-card p-6 text-center"
            {...fadeUp}
            transition={fadeUpTransition(0.5)}
          >
            <p className="text-sm text-[#64748B] mb-3">All plans include</p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
              {[
                { icon: Sparkles, label: "Bespoke SimPatient LLM" },
                { icon: Shield, label: "SSO Authentication" },
                { icon: BookOpen, label: "Fine-tuned on clinical consultations" },
                { icon: Clock, label: "24/7 availability" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-xs sm:text-sm text-[#134E4A]">
                  <item.icon className="w-4 h-4 text-[#0891B2]" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== COMPARISON: ACTOR vs SIMPATIENT ===== */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E0F2FE]">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Total Cost of Ownership
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Evaluating the true cost of human standardized patients versus the AI Simulation Platform
            </p>
          </motion.div>

          {/* Side-by-side cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Traditional */}
            <motion.div
              className="clay-card border-red-200 p-8"
              {...fadeUp}
              transition={fadeUpTransition(0.2)}
            >
              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-4">Traditional Standardized Patients</h3>
                <p className="text-xs uppercase tracking-wide text-[#64748B] font-semibold mb-2">Fully Loaded Cost Per Session</p>
                <p className="font-heading text-4xl sm:text-5xl font-bold text-red-500 mb-1">~£55+</p>
                <p className="text-xs text-[#64748B] italic">Includes hidden operational overheads</p>
              </div>

              {/* Cost breakdown bar */}
              <div className="flex justify-center mb-8">
                <div className="w-24 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-20 bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">Faculty</div>
                  <div className="h-8 bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">Admin</div>
                  <div className="h-6 bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">Space</div>
                  <div className="h-8 bg-yellow-500 flex items-center justify-center text-white text-[10px] font-bold">Actor</div>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  { title: "High Faculty Burden", desc: "Requires 1:1 faculty presence for observation and feedback" },
                  { title: "Limited Availability", desc: "Sessions must be scheduled during business hours in physical labs" },
                  { title: "Inconsistent Fidelity", desc: "Actor performance varies; difficult to standardize across cohorts" },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-sm text-[#134E4A] block">{item.title}</span>
                      <span className="text-xs text-[#64748B]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* SimPatient */}
            <motion.div
              className="clay-card border-[#0891B2] relative p-8"
              {...fadeUp}
              transition={fadeUpTransition(0.3)}
            >
              {/* Recommended badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#0891B2] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                  Recommended
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-4">AI Simulation Platform</h3>
                <p className="text-xs uppercase tracking-wide text-[#64748B] font-semibold mb-2">All-Inclusive Cost Per Session</p>
                <p className="font-heading text-4xl sm:text-5xl font-bold text-[#0891B2] mb-1">£10</p>
                <p className="text-xs text-[#64748B] italic">Based on Standard tier video credits</p>
              </div>

              {/* Cost bar */}
              <div className="flex justify-center mb-8">
                <div className="w-24 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-10 bg-[#0891B2] flex items-center justify-center text-white text-[10px] font-bold">AI License</div>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  { title: "Zero Faculty Requirement", desc: "Automated, immediate feedback rubrics enable independent practice" },
                  { title: "24/7 Remote Access", desc: "Students practice anytime, anywhere, via browser" },
                  { title: "Standardized & Scalable", desc: "Every student gets the exact same high-fidelity clinical baseline" },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0891B2] mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-sm text-[#134E4A] block">{item.title}</span>
                      <span className="text-xs text-[#64748B]">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Detailed comparison table */}
          <motion.div
            className="clay-card overflow-hidden"
            {...fadeUp}
            transition={fadeUpTransition(0.4)}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F0FDFA]">
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-[#134E4A]">Category</th>
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-red-500">Traditional Actor</th>
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-[#0891B2]">Simpatient AI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F0FDFA]/50'}>
                      <td className="py-4 px-6 font-semibold text-sm text-[#134E4A] whitespace-nowrap">{row.category}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-sm text-red-500 block">{row.traditional.value}</span>
                        <span className="text-xs text-[#64748B]">{row.traditional.sub}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-sm text-[#0891B2] block">{row.simpatient.value}</span>
                        <span className="text-xs text-[#64748B]">{row.simpatient.sub}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Savings callout */}
          <motion.div
            className="mt-8 clay-card p-8 text-center border-[#0891B2]"
            {...fadeUp}
            transition={fadeUpTransition(0.5)}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-[#0891B2]" />
              <span className="font-heading text-2xl sm:text-3xl font-bold text-[#0891B2]">82% cost reduction</span>
            </div>
            <p className="text-[#64748B] max-w-xl mx-auto">
              Simpatient AI delivers standardized, scalable clinical training at a fraction of the cost of traditional standardized patient programmes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-[#F0FDFA] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-[#E0F2FE]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <div className="w-14 h-14 bg-white border-2 border-[#E0F2FE] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-clay-sm">
              <GraduationCap className="w-7 h-7 text-[#0891B2]" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-[#64748B] mb-8">
              Book a personalised demo and see how Simpatient AI can transform your medical education programme.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                as={Link}
                href="/book-demo"
                size="lg"
                className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-8 py-3 rounded-xl font-medium text-base shadow-clay-sm"
                startContent={<Building2 className="w-4 h-4" />}
              >
                Book a Demo
              </Button>
              <Button
                as={Link}
                href="mailto:hello@simpatient.co.uk"
                size="lg"
                className="bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2] px-6 py-3 rounded-xl font-medium text-base"
                startContent={<Mail className="w-4 h-4" />}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#134E4A] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-xs">
            &copy; 2025 Simpatient AI. All rights reserved. Pricing is subject to change.
          </p>
        </div>
      </footer>
    </div>
  );
}
