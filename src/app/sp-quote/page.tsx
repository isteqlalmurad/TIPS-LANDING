'use client';

import {
  Button,
  Link
} from "@heroui/react";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Mic,
  Video,
  Calendar,
  Wallet,
  Clock,
  BarChart3,
  RefreshCw,
  Receipt,
  Mail,
  Users,
  Sparkles,
  HeadphonesIcon,
  LineChart,
  AlertTriangle,
  Zap,
  Info,
  Shield,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

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

// ============================================================
// Pricing Tiers
// ============================================================
type FeatureItem = string | { text: string; tooltip: string };

const tiers = [
  {
    name: "Pilot",
    price: "30,000",
    tagline: "Perfect for getting started with AI patient simulation",
    highlighted: false,
    rates: { text: "2.40", audio: "4.80", video: "9.60" },
    inheritsFrom: null,
    sections: [
      {
        title: "Patients",
        icon: Users,
        items: [
          { text: "MLA-aligned Patient Library", tooltip: "A curated library of patients aligned to the UK Medical Licensing Assessment (MLA) presentations." } as FeatureItem,
        ] as FeatureItem[],
      },
      {
        title: "Feedback",
        icon: Sparkles,
        items: ["Individualised & Instant Feedback"] as FeatureItem[],
      },
      {
        title: "Support",
        icon: HeadphonesIcon,
        items: ["Email Support"] as FeatureItem[],
      },
    ],
  },
  {
    name: "Standard",
    price: "60,000",
    tagline: "Ideal for departments scaling simulation training",
    highlighted: true,
    rates: { text: "2.20", audio: "4.40", video: "8.80" },
    inheritsFrom: "Pilot",
    sections: [
      {
        title: "Patients",
        icon: Users,
        items: ["Custom Patients (20 voices, 15 faces)"] as FeatureItem[],
      },
      {
        title: "Feedback",
        icon: Sparkles,
        items: [
          { text: "Calgary-Cambridge Feedback", tooltip: "Feedback structured around the Calgary-Cambridge consultation framework — the global standard for medical communication." } as FeatureItem,
          "Student PDF Export",
        ] as FeatureItem[],
      },
      {
        title: "Support",
        icon: HeadphonesIcon,
        items: ["Priority Support"] as FeatureItem[],
      },
    ],
  },
  {
    name: "SimCentre",
    price: "90,000",
    tagline: "Full-scale deployment for simulation centres",
    highlighted: false,
    rates: { text: "2.00", audio: "4.00", video: "8.00" },
    inheritsFrom: "Standard",
    sections: [
      {
        title: "Patients",
        icon: Users,
        items: [
          "Custom Patients (100s of voices & faces)",
          { text: "Random Patient Generator", tooltip: "Powered by our Diversity Engine — generates randomised, culturally diverse patient scenarios on demand." } as FeatureItem,
        ] as FeatureItem[],
      },
      {
        title: "Feedback",
        icon: Sparkles,
        items: ["Custom Feedback Rubrics"] as FeatureItem[],
      },
      {
        title: "Educator Intelligence",
        icon: LineChart,
        items: [
          { text: "Cohort Dashboards", tooltip: "Cohort-level performance dashboards to identify common areas of clinical weakness across a year group." } as FeatureItem,
        ] as FeatureItem[],
      },
      {
        title: "Support",
        icon: HeadphonesIcon,
        items: ["Dedicated Support Manager", "Annual training workshops"] as FeatureItem[],
      },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "Bespoke solutions for large-scale institutions",
    highlighted: false,
    rates: null,
    inheritsFrom: "SimCentre",
    sections: [
      {
        title: "Patients",
        icon: Users,
        items: [
          { text: "Custom-built scenarios", tooltip: "Our clinical team builds patient scenarios specifically for your curriculum and assessment framework." } as FeatureItem,
          "Unlimited consultations",
        ] as FeatureItem[],
      },
      {
        title: "Feedback",
        icon: Sparkles,
        items: [
          "Fully custom rubrics & reporting",
          { text: "LMS & ePortfolio integrations", tooltip: "Direct integrations with your Learning Management System and student ePortfolios (e.g. Canvas, Moodle, Blackboard)." } as FeatureItem,
        ] as FeatureItem[],
      },
      {
        title: "Support",
        icon: HeadphonesIcon,
        items: [
          "Dedicated Support Manager",
          "On-site training & workshops",
          { text: "SLA guarantees", tooltip: "Formal Service Level Agreements for uptime, response times, and issue resolution." } as FeatureItem,
        ] as FeatureItem[],
      },
    ],
  },
];

// ============================================================
// Total Cost of Ownership comparison data
// ============================================================
const comparisonRows = [
  {
    category: "Cost",
    traditional: { value: "~£55+", sub: "per session (including hidden overheads)" },
    simpatient: { value: "£2.00–£8.80", sub: "per session (all-inclusive, text to video)" },
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
    traditional: { value: "Variable", sub: "Actor performance varies; hard to standardise across cohorts" },
    simpatient: { value: "Standardised", sub: "Every student gets the same high-fidelity clinical baseline" },
  },
  {
    category: "Scalability",
    traditional: { value: "Limited", sub: "Constrained by actor and lab availability" },
    simpatient: { value: "Unlimited", sub: "Scales to any number of students simultaneously" },
  },
  {
    category: "Feedback",
    traditional: { value: "Delayed", sub: "Depends on faculty availability for debrief" },
    simpatient: { value: "Instant", sub: "Immediate Calgary-Cambridge feedback after each session" },
  },
];

// ============================================================
// Page Component
// ============================================================
export default function PricingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      {/* ===== NAV ===== */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/[0.04] border border-[#E0F2FE] px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-1.5">
              <Image src="/logo/SimLogo-dark.png" alt="SimPatient Logo" width={30} height={30} />
              <span className="font-heading text-sm font-semibold text-[#134E4A]">SimPatient AI</span>
            </Link>
            <Button
              onPress={() => router.push("/")}
              size="sm"
              variant="light"
              startContent={<ArrowLeft className="w-4 h-4" />}
              className="text-[#134E4A]/70 hover:text-[#134E4A] text-sm"
            >
              Back to home
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== HEADER ===== */}
      <section className="pt-32 sm:pt-36 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="font-heading text-sm uppercase tracking-widest text-[#0891B2] font-medium mb-4"
            {...fadeUp}
            transition={fadeUpTransition(0)}
          >
            Pricing
          </motion.p>
          <motion.h1
            className="font-heading text-[30px] sm:text-[40px] lg:text-[50px] font-light text-[#134E4A] tracking-tight leading-[1.15] mb-5"
            {...fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            Plans that scale with your institution
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed"
            {...fadeUp}
            transition={fadeUpTransition(0.2)}
          >
            From pilot programmes to full-scale simulation centres. All plans include our bespoke SimPatient LLM, fine-tuned on thousands of clinical consultations.
          </motion.p>
        </div>
      </section>

      {/* ===== PRICING TIERS ===== */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`relative clay-card p-5 sm:p-6 flex flex-col ${
                  tier.highlighted ? "ring-2 ring-[#0891B2] shadow-xl" : ""
                }`}
                {...fadeUp}
                transition={fadeUpTransition(0.1 + i * 0.1)}
              >
                {/* Most Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0891B2] text-white text-xs font-medium whitespace-nowrap">
                    ★ Most Popular
                  </div>
                )}

                {/* Tier header */}
                <div className="mb-5">
                  <h3 className="font-heading text-xs uppercase tracking-widest text-[#64748B] font-medium mb-3">
                    {tier.name}
                  </h3>
                  {tier.rates ? (
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-heading text-4xl font-light text-[#134E4A]">
                        £{tier.price}
                      </span>
                      <span className="text-sm text-[#64748B]">/year</span>
                    </div>
                  ) : (
                    <div className="mb-2">
                      <span className="font-heading text-4xl font-light text-[#134E4A]">
                        Custom
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-[#64748B] leading-snug">{tier.tagline}</p>
                </div>

                {/* Per-session sessions (only for non-enterprise tiers) */}
                {tier.rates && (() => {
                  const budget = parseInt(tier.price.replace(/,/g, ''));
                  const videoSessions = Math.floor(budget / parseFloat(tier.rates.video));
                  const audioSessions = Math.floor(budget / parseFloat(tier.rates.audio));
                  const textSessions = Math.floor(budget / parseFloat(tier.rates.text));
                  const breakdown = [
                    { label: 'Video', rate: tier.rates.video, sessions: videoSessions },
                    { label: 'Audio', rate: tier.rates.audio, sessions: audioSessions },
                    { label: 'Text', rate: tier.rates.text, sessions: textSessions },
                  ];
                  return (
                    <div className="mb-5 pb-5 border-b border-[#E0F2FE]">
                      <div className="relative bg-[#F0FDFA] rounded-xl p-4">
                        {/* Video — the hero rate */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E0F2FE]">
                          <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-[#0891B2]" />
                            <span className="text-xs uppercase tracking-wide text-[#64748B] font-medium">Video</span>
                          </div>
                          <div className="text-right">
                            <div className="font-heading text-xl font-semibold text-[#134E4A] leading-none">{videoSessions.toLocaleString()}</div>
                            <div className="text-[10px] text-[#64748B] mt-0.5">sessions</div>
                          </div>
                        </div>
                        {/* Audio + Text — compact, inline */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <Mic className="w-3.5 h-3.5 text-[#0891B2]" />
                              <span className="text-xs text-[#64748B]">Audio</span>
                            </div>
                            <span className="text-sm font-semibold text-[#134E4A]">{audioSessions.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5 text-[#0891B2]" />
                              <span className="text-xs text-[#64748B]">Text</span>
                            </div>
                            <span className="text-sm font-semibold text-[#134E4A]">{textSessions.toLocaleString()}</span>
                          </div>
                        </div>
                        {/* Single info icon in bottom-right corner */}
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border border-[#E0F2FE]">
                          <InfoTip breakdown={breakdown} budget={budget} />
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Enterprise unlimited callout */}
                {!tier.rates && (
                  <div className="mb-5 pb-5 border-b border-[#E0F2FE]">
                    <div className="bg-[#F0FDFA] rounded-xl p-4 flex items-center gap-3">
                      <Zap className="w-5 h-5 text-[#0891B2]" />
                      <div>
                        <div className="font-heading text-base font-semibold text-[#134E4A] leading-tight">Unlimited</div>
                        <div className="text-[11px] text-[#64748B]">consultations, all modalities</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Inherits note */}
                {tier.inheritsFrom && (
                  <p className="text-[11px] text-[#0891B2] font-medium mb-3 flex items-center gap-1.5">
                    <Check className="w-3 h-3" />
                    Everything in {tier.inheritsFrom}, plus:
                  </p>
                )}

                {/* Feature sections */}
                <div className="space-y-4 mb-5 flex-1">
                  {tier.sections.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                      <div key={section.title}>
                        <div className="flex items-center gap-2 mb-1.5">
                          <SectionIcon className="w-3.5 h-3.5 text-[#0891B2] shrink-0" />
                          <h4 className="font-heading text-[11px] uppercase tracking-widest text-[#134E4A] font-semibold">
                            {section.title}
                          </h4>
                        </div>
                        <ul className="space-y-1">
                          {section.items.map((item, idx) => {
                            const text: string = typeof item === 'string' ? item : item.text;
                            const tooltip: string | null = typeof item === 'string' ? null : item.tooltip;
                            return (
                              <li key={idx} className="flex items-start gap-1.5 text-[13px] text-[#64748B] leading-snug">
                                <Check className="w-3.5 h-3.5 text-[#0891B2] mt-0.5 shrink-0" />
                                <span className="flex items-center gap-1 flex-wrap">
                                  <span>{text}</span>
                                  {tooltip && <InfoTip content={tooltip} />}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                {/* CTA */}
                <Button
                  as={Link}
                  href="/book-demo"
                  size="lg"
                  className={`w-full rounded-xl font-medium ${
                    tier.highlighted
                      ? "bg-[#0891B2] text-white hover:bg-[#0E7490]"
                      : "bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2]"
                  }`}
                >
                  Contact Us
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Shared features bar — included in all tiers */}
          <motion.div
            className="mt-8 clay-card p-6 text-center"
            {...fadeUp}
            transition={fadeUpTransition(0.5)}
          >
            <p className="text-xs uppercase tracking-widest text-[#64748B] font-medium mb-4">All plans include</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10">
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

      {/* ===== HOW THE PRICING WORKS ===== */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E0F2FE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-10" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-3">
              How the pricing works
            </h2>
            <p className="text-[#64748B]">Straightforward terms, no surprises.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            {...fadeUp}
            transition={fadeUpTransition(0.2)}
          >
            <TermCard
              icon={Calendar}
              title="12-month term"
              body="All subscriptions operate on a 12-month contractual term."
            />
            <TermCard
              icon={Wallet}
              title="Prepaid drawdown"
              body="Your tier cost serves as a prepaid drawdown balance you spend down through usage."
            />
            <TermCard
              icon={Clock}
              title="15-minute sessions"
              body="Individual consultations are capped at 15 minutes each."
            />
            <TermCard
              icon={BarChart3}
              title="Deducted per rate"
              body="Session costs are deducted from your balance at the tier's per-session unit rate."
            />
            <TermCard
              icon={RefreshCw}
              title="Overage billing"
              body="Once depleted, further usage in the same term is billed at the same tier rate."
            />
            <TermCard
              icon={Receipt}
              title="Upgrade anytime"
              body="Sign a new annual agreement at any time to access a higher tier with better rates."
            />
          </motion.div>

          <motion.p
            className="text-center text-xs text-[#64748B] mt-8"
            {...fadeUp}
            transition={fadeUpTransition(0.3)}
          >
            All stated prices are exclusive of Value Added Tax (VAT).
          </motion.p>
        </div>
      </section>

      {/* ===== TOTAL COST OF OWNERSHIP ===== */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E0F2FE]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              Total Cost of Ownership
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Evaluating the true cost of human simulated patients versus the SimPatient AI platform.
            </p>
          </motion.div>

          {/* Side-by-side cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Traditional */}
            <motion.div
              className="clay-card p-6 sm:p-8"
              {...fadeUp}
              transition={fadeUpTransition(0.2)}
            >
              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-3">Traditional Simulated Patients</h3>
                <p className="text-xs uppercase tracking-wide text-[#64748B] font-semibold mb-2">Fully-loaded cost per session</p>
                <p className="font-heading text-4xl sm:text-5xl font-light text-[#DC2626] mb-1">~£55+</p>
                <p className="text-xs text-[#64748B] italic">Includes hidden operational overheads</p>
              </div>

              {/* Cost breakdown bar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-20 bg-red-500 flex items-center justify-center text-white text-[10px] font-bold">Faculty</div>
                  <div className="h-8 bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">Admin</div>
                  <div className="h-6 bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">Space</div>
                  <div className="h-8 bg-yellow-500 flex items-center justify-center text-white text-[10px] font-bold">Actor</div>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  { title: "High Faculty Burden", desc: "Requires 1:1 faculty presence for observation and feedback" },
                  { title: "Limited Availability", desc: "Sessions must be scheduled during business hours in physical labs" },
                  { title: "Inconsistent Fidelity", desc: "Actor performance varies; difficult to standardise across cohorts" },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
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
              className="clay-card p-6 sm:p-8 ring-2 ring-[#0891B2] relative"
              {...fadeUp}
              transition={fadeUpTransition(0.3)}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-[#0891B2] text-white text-xs font-semibold px-4 py-1 rounded-full shadow-sm">
                  Recommended
                </span>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-heading text-xl font-semibold text-[#134E4A] mb-3">SimPatient AI Platform</h3>
                <p className="text-xs uppercase tracking-wide text-[#64748B] font-semibold mb-2">All-inclusive cost per session</p>
                <p className="font-heading text-4xl sm:text-5xl font-light text-[#0891B2] mb-1">£2.00–£8.80</p>
                <p className="text-xs text-[#64748B] italic">Text to video, Standard tier rates</p>
              </div>

              {/* Cost bar */}
              <div className="flex justify-center mb-6">
                <div className="w-24 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-10 bg-[#0891B2] flex items-center justify-center text-white text-[10px] font-bold">AI License</div>
                </div>
              </div>

              <ul className="space-y-3">
                {[
                  { title: "Zero Faculty Requirement", desc: "Automated, immediate feedback rubrics enable independent practice" },
                  { title: "24/7 Remote Access", desc: "Students practice anytime, anywhere, via browser" },
                  { title: "Standardised & Scalable", desc: "Every student gets the exact same high-fidelity clinical baseline" },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#0891B2] mt-0.5 shrink-0" />
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
            className="clay-card overflow-hidden mb-10"
            {...fadeUp}
            transition={fadeUpTransition(0.4)}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F0FDFA]">
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-[#134E4A]">Category</th>
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-[#DC2626]">Traditional Actor</th>
                    <th className="text-left py-4 px-6 font-heading text-sm font-semibold text-[#0891B2]">SimPatient AI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F0FDFA]/50'}>
                      <td className="py-4 px-6 font-semibold text-sm text-[#134E4A] whitespace-nowrap">{row.category}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-sm text-[#DC2626] block">{row.traditional.value}</span>
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
            className="rounded-[20px] p-6 sm:p-10 bg-gradient-to-br from-[#0891B2] to-[#0E7490] text-center shadow-clay"
            {...fadeUp}
            transition={fadeUpTransition(0.5)}
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-white" />
              <p className="font-heading text-white/80 text-sm uppercase tracking-widest">Cost Reduction</p>
            </div>
            <p className="font-heading text-4xl sm:text-5xl font-light text-white mb-3">
              Up to 84% lower
            </p>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              SimPatient delivers standardised, scalable clinical training at a fraction of the cost of traditional simulated patient programmes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-white py-16 sm:py-20 border-t border-[#E0F2FE]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4"
            {...fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            Ready to bring SimPatient to your institution?
          </motion.h2>
          <motion.p
            className="text-lg text-[#64748B] mb-8"
            {...fadeUp}
            transition={fadeUpTransition(0.2)}
          >
            Book a call with our team to discuss pricing, pilot scope, and deployment timelines.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            {...fadeUp}
            transition={fadeUpTransition(0.3)}
          >
            <Button
              as={Link}
              href="/book-demo"
              size="lg"
              className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-8 py-3 rounded-xl font-medium text-base shadow-clay-sm w-full sm:w-auto"
              startContent={<Calendar className="w-4 h-4" />}
            >
              Book a Call
            </Button>
            <Button
              as={Link}
              href="mailto:hello@simpatient.co.uk"
              size="lg"
              className="bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2] px-6 py-3 rounded-xl font-medium text-base w-full sm:w-auto"
              startContent={<Mail className="w-4 h-4" />}
            >
              hello@simpatient.co.uk
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#134E4A] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/40 text-xs">
            © 2026 SimPatient AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================
// Click-to-reveal info tooltip — supports either text content or a pricing breakdown table
type Breakdown = { label: string; rate: string; sessions: number };
function InfoTip({
  content,
  size = "sm",
  breakdown,
  budget,
}: {
  content?: string;
  size?: "xs" | "sm";
  breakdown?: Breakdown[];
  budget?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // Defer attaching the listener so the opening click doesn't immediately close it
    const id = window.setTimeout(() => document.addEventListener('click', handleClick), 0);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  const iconSize = size === "xs" ? "w-2.5 h-2.5" : "w-3 h-3";
  const isTable = breakdown && budget !== undefined;

  return (
    <span ref={ref} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="inline-flex items-center text-[#94A3B8] hover:text-[#0891B2] transition-colors"
        aria-label="More info"
      >
        <Info className={`${isTable ? 'w-3.5 h-3.5' : iconSize} cursor-pointer`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 bg-[#134E4A] text-white text-[11px] leading-snug rounded-lg shadow-lg ${
              isTable
                ? 'right-0 bottom-full mb-2 w-64 p-3'
                : 'left-1/2 -translate-x-1/2 top-full mt-1.5 w-56 p-2.5'
            }`}
          >
            {isTable ? (
              <span className="block">
                <span className="block text-[10px] uppercase tracking-widest text-white/60 mb-2">Pricing breakdown</span>
                <span className="block space-y-1.5">
                  {breakdown!.map((row) => (
                    <span key={row.label} className="flex items-center justify-between gap-3">
                      <span className="text-white/80">{row.label}</span>
                      <span className="font-mono text-white/90">
                        £{row.rate} × {row.sessions.toLocaleString()}
                      </span>
                    </span>
                  ))}
                </span>
                <span className="block mt-2 pt-2 border-t border-white/20 flex items-center justify-between gap-3">
                  <span className="font-semibold">Total</span>
                  <span className="font-mono font-semibold">£{budget!.toLocaleString()}</span>
                </span>
                <span className="block mt-2 text-[9px] text-white/50 italic">
                  Max 15 min per session. Spend balance on any mix.
                </span>
              </span>
            ) : (
              <>
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#134E4A] rotate-45" />
                <span className="relative block">{content}</span>
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function TermCard({ icon: Icon, title, body }: { icon: typeof Calendar; title: string; body: string }) {
  return (
    <div className="clay-card clay-card-hover p-5">
      <div className="w-10 h-10 rounded-xl bg-[#F0FDFA] border border-[#E0F2FE] flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-[#0891B2]" />
      </div>
      <h3 className="font-heading font-semibold text-[#134E4A] text-sm mb-1.5">{title}</h3>
      <p className="text-xs text-[#64748B] leading-relaxed">{body}</p>
    </div>
  );
}


