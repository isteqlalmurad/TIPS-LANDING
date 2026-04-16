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
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import CountUp from "react-countup";

// Geo-personalisation: detect Arabic region from middleware cookie
function useGeoCountry(): string {
  const [country, setCountry] = useState('GB');
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )geo-country=([^;]*)/);
    if (match) setCountry(match[1]);
  }, []);
  return country;
}

const ARABIC_COUNTRIES = ['SA', 'AE'];

// Arabic hero content for Saudi Arabia & UAE visitors
const contentAr = {
  // Nav
  navBlog: 'المدوّنة',
  navResearch: 'الأبحاث',
  navAbout: 'من نحن',
  navLogin: 'تسجيل الدخول',
  openaiBadge: 'مميّز من أكاديمية OpenAI 2025',
  // Hero
  subtitlePre: 'انضم إلى أكثر من',
  subtitleNum: '700+',
  subtitlePost: 'طبيب المستقبل',
  headline: 'طوّر مهارات الاستشارة مع مرضى ذكاء اصطناعي متنوعين',
  body: 'أنشئ سيناريوهات متنوعة للمرضى وتدرّب على استشارات واقعية مبنية على بيانات تعليمية موثوقة من NHS. ابنِ ثقتك واحصل على تقييم متوافق مع منهجك — مدعوم ببحث جامعة سانت أندروز.',
  cta1: 'احجز عرضًا توضيحيًا',
  cta2: 'ابدأ التعلّم اليوم',
  trust: 'بدعم من جامعة\nسانت أندروز',
  trustNes: 'مدرّب على بيانات\nNHS Education for Scotland',
  tapForSound: 'اضغط للصوت',
  // Stats
  statMedicalStudents: 'طالب طب',
  statAiPatients: 'مريض ذكاء اصطناعي',
  statInstitutions: 'مؤسسات',
  statInstitution: 'مؤسسة',
  // Features
  featuresTitle: 'تفاعلات متعددة الوسائط مع مرضى الذكاء الاصطناعي',
  featuresSubtitle: 'ثلاث طرق تفاعلية غامرة، كل منها مصمم لبناء الثقة السريرية بأمان.',
  modeText: 'محادثات نصية',
  modeTextDesc: 'تدرّب على الأسئلة التشخيصية من خلال محادثات نصية طبيعية مع المرضى. طوّر مهارات أخذ التاريخ المرضي بإيقاعك الخاص.',
  modeVoice: 'تفاعلات صوتية',
  modeVoiceDesc: 'طوّر مهارات التواصل عبر محادثات صوتية واقعية. تدرّب على النبرة والتعاطف والأسئلة السريرية.',
  modeAvatar: 'جلسات مع الأفاتار',
  modeAvatarDesc: 'عِش استشارات غامرة مع أفاتار مرضى واقعيين بالذكاء الاصطناعي. أقرب شيء لمقابلات المرضى الحقيقية.',
  // Video
  videoTitle: 'شاهد SimPatient في العمل',
  videoSubtitle: 'شاهد كيف تُحوّل منصتنا التدريب الطبي من خلال تفاعلات غامرة بالذكاء الاصطناعي',
  // Diversity Engine
  diversityTitle: 'حوّل نصوص مرضاك إلى واقع',
  diversityBody: 'أنشئ مرضى ذكاء اصطناعي واقعيين بمجرّد بضع أوامر. محرّك التنوّع الخاص بنا يُنشئ سيناريوهات مرضى متنوّعة ثقافياً ومتوافقة مع منهجك. أو استخدم نصوصك الخاصة وحوّلها إلى واقع.',
  diversityItem1Title: 'إنشاء عبر الأوامر',
  diversityItem1Desc: 'حوّل أوصافًا بسيطة إلى عروض مرضى معقّدة وواقعية',
  diversityItem2Title: 'التنوّع الثقافي',
  diversityItem2Desc: 'أنشئ مرضى من خلفيات متنوّعة بسياقات ثقافية أصيلة',
  diversityItem3Title: 'التوافق مع المنهج',
  diversityItem3Desc: 'تكيّف السيناريوهات تلقائياً مع أهداف التعلّم ومستواك',
  // Authority
  authorityTitle: 'ثقة أطباء المستقبل',
  authorityBody: 'أكثر من 100 مريض افتراضي عبر كل التخصّصات الطبية. تقييم فوري للاستدلال السريري والتواصل. تعلّم قائم على الأدلة مدعوم بأبحاث جامعة سانت أندروز.',
  exploreResearch: 'استكشف أبحاثنا',
  // Personalization
  personalizationTitle: 'يتكيّف مع رحلتك التعليمية',
  personalizationBody: 'إذا كنت مؤسسة وترغب أن يتدرّب طلّابك مع مرضى الذكاء الاصطناعي، فإن ذكاءنا الاصطناعي يفهم مستوى كل طالب ويُنشئ سيناريوهات مرضى مخصّصة لأي تخصّص ومستوى مهارة.',
  // Final CTA
  finalCtaTitle: 'جاهز لتحويل التعليم الطبي؟',
  finalCtaBody: 'انضم إلى أكثر من 700 طالب طب يتدرّبون بالفعل مع SimPatient.',
  finalCtaPrimary: 'ابدأ التعلّم اليوم',
  finalCtaSecondary: 'احجز عرضًا توضيحيًا',
  // Footer
  footerTagline: 'نُحوّل التعليم الطبي عبر الذكاء الاصطناعي',
  footerAddress: 'كلية الطب، جامعة سانت أندروز\nN Haugh, St Andrews KY16 9TF',
  footerCopyright: '© 2026 SimPatient AI. جميع الحقوق محفوظة.',
};

const contentEn = {
  // Nav
  navBlog: 'Blog',
  navResearch: 'Research',
  navAbout: 'About',
  navLogin: 'Login',
  openaiBadge: 'Featured by OpenAI Academy 2025',
  // Hero
  subtitlePre: 'Join',
  subtitleNum: '700+',
  subtitlePost: 'future doctors',
  headline: 'Building better consultation skills with diverse AI patients',
  body: 'Create diverse patient scenarios and practice realistic consultations trained on authentic NHS Education data. Build confidence and get curriculum-aligned feedback — research-backed by the University of St Andrews.',
  cta1: 'Book a Demo',
  cta2: 'Start Learning Today',
  trust: 'Backed by University\nof St Andrews',
  trustNes: 'Trained on NHS\nEducation for Scotland',
  tapForSound: 'Tap for sound',
  // Stats
  statMedicalStudents: 'Medical Students',
  statAiPatients: 'AI Patients',
  statInstitutions: 'Institutions',
  statInstitution: 'Institution',
  // Features
  featuresTitle: 'Multi-Modal AI Patient Interactions',
  featuresSubtitle: 'Three immersive interaction modes, each designed to build clinical confidence safely.',
  modeText: 'Text Conversations',
  modeTextDesc: 'Practice diagnostic questioning through natural text exchanges with AI patients. Build history-taking skills at your own pace.',
  modeVoice: 'Voice Interactions',
  modeVoiceDesc: 'Develop communication skills through realistic audio conversations. Practice tone, empathy, and clinical questioning.',
  modeAvatar: 'Avatar Sessions',
  modeAvatarDesc: 'Experience immersive consultations with lifelike AI patient avatars. The closest thing to real patient encounters.',
  // Video
  videoTitle: 'See Simpatient AI in action',
  videoSubtitle: 'Watch how our platform transforms medical training through immersive AI interactions',
  // Diversity Engine
  diversityTitle: 'Bring your Patient Scripts to Life',
  diversityBody: 'Create realistic AI patients with just a few prompts. Our state-of-the-art Diversity Engine creates culturally diverse AI patient scenarios aligned to your curriculum. Or use your own patient scripts and bring them to life.',
  diversityItem1Title: 'Prompt-Based Generation',
  diversityItem1Desc: 'Transform simple descriptions into complex, realistic patient presentations',
  diversityItem2Title: 'Cultural Diversity',
  diversityItem2Desc: 'Generate patients from diverse backgrounds with authentic cultural contexts',
  diversityItem3Title: 'Curriculum Alignment',
  diversityItem3Desc: 'Automatically adapt scenarios to match your learning objectives and level',
  // Authority
  authorityTitle: 'Trusted by the future of medicine',
  authorityBody: '100+ virtual patients spanning all medical specialties. Real-time feedback on clinical reasoning and communication. Evidence-based learning backed by University of St Andrews research.',
  exploreResearch: 'Explore our research',
  // Personalization
  personalizationTitle: 'Adapts to your learning journey',
  personalizationBody: 'If you\'re an institution and want your students to practice with AI patients, our AI understands each student\'s level and creates personalized patient scenarios for any specialization and skill level.',
  // Final CTA
  finalCtaTitle: 'Ready to transform medical education?',
  finalCtaBody: 'Join 700+ medical students already practising with Simpatient AI.',
  finalCtaPrimary: 'Start Learning Today',
  finalCtaSecondary: 'Book a Demo',
  // Footer
  footerTagline: 'Transforming medical education through AI',
  footerAddress: 'School of Medicine, University of St Andrews\nN Haugh, St Andrews KY16 9TF',
  footerCopyright: '© 2026 SimPatient AI. All rights reserved.',
};

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

// Navigation Component — floating pill, hides on scroll down, shows on scroll up
const Navigation = ({ onLanguageToggle, isArabic, t }: { onLanguageToggle: () => void; isArabic: boolean; t: typeof contentEn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50) {
        // Always show at top
        setNavVisible(true);
      } else if (currentY > lastScrollY.current + 5) {
        // Scrolling down
        setNavVisible(false);
        setIsMenuOpen(false);
      } else if (currentY < lastScrollY.current - 5) {
        // Scrolling up
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: navVisible ? 1 : 0, y: navVisible ? 0 : -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
      >
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-lg shadow-black/[0.04] border border-[#E0F2FE] px-4 lg:px-6 py-2.5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1.5">
              <Image
                src="/logo/SimLogo-dark.png"
                alt="SimPatient AI Logo"
                width={30}
                height={30}
              />
              <span className="font-heading text-sm font-semibold text-[#134E4A]">SimPatient AI</span>
            </Link>

            {/* Center links (desktop) */}
            <div className="hidden md:flex items-center space-x-5">
              <Link href="/blog" className="text-sm text-[#134E4A]/70 hover:text-[#134E4A] transition-colors duration-200">
                {t.navBlog}
              </Link>
              <Link href="/academic" className="text-sm text-[#134E4A]/70 hover:text-[#134E4A] transition-colors duration-200">
                {t.navResearch}
              </Link>
              <Link href="/about" className="text-sm text-[#134E4A]/70 hover:text-[#134E4A] transition-colors duration-200">
                {t.navAbout}
              </Link>
            </div>

            {/* Right side — Language toggle + CTA */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Language toggle */}
              <div className="flex items-center bg-[#F0FDFA] rounded-full p-0.5 border border-[#E0F2FE]">
                <button
                  onClick={() => { if (isArabic) onLanguageToggle(); }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${!isArabic ? 'bg-white text-[#134E4A] shadow-sm' : 'text-[#134E4A]/50 hover:text-[#134E4A]/70'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => { if (!isArabic) onLanguageToggle(); }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${isArabic ? 'bg-white text-[#134E4A] shadow-sm' : 'text-[#134E4A]/50 hover:text-[#134E4A]/70'}`}
                >
                  AR
                </button>
              </div>

              <Button
                as={Link}
                href="https://app.simpatient.co.uk"
                target="_blank"
                size="sm"
                className="bg-[#0891B2] text-white hover:bg-[#0E7490] transition-colors duration-200 px-5 py-1.5 rounded-xl text-sm font-medium"
              >
                {t.navLogin}
              </Button>
            </div>

            {/* Mobile — Language toggle + Hamburger */}
            <div className="flex md:hidden items-center space-x-2">
              <div className="flex items-center bg-[#F0FDFA] rounded-full p-0.5 border border-[#E0F2FE]">
                <button
                  onClick={() => { if (isArabic) onLanguageToggle(); }}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${!isArabic ? 'bg-white text-[#134E4A] shadow-sm' : 'text-[#134E4A]/50'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => { if (!isArabic) onLanguageToggle(); }}
                  className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 ${isArabic ? 'bg-white text-[#134E4A] shadow-sm' : 'text-[#134E4A]/50'}`}
                >
                  AR
                </button>
              </div>
              <button
                className="text-[#134E4A] p-1.5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-2 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-[#E0F2FE] overflow-hidden"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col py-3 px-4 space-y-1">
                <Link href="/blog" className="py-2.5 px-3 rounded-xl text-sm text-[#134E4A] hover:bg-[#F0FDFA] transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {t.navBlog}
                </Link>
                <Link href="/academic" className="py-2.5 px-3 rounded-xl text-sm text-[#134E4A] hover:bg-[#F0FDFA] transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {t.navResearch}
                </Link>
                <Link href="/about" className="py-2.5 px-3 rounded-xl text-sm text-[#134E4A] hover:bg-[#F0FDFA] transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {t.navAbout}
                </Link>
                <div className="pt-1">
                  <Button
                    as={Link}
                    href="https://app.simpatient.co.uk"
                    target="_blank"
                    size="sm"
                    className="bg-[#0891B2] text-white hover:bg-[#0E7490] px-5 py-2 rounded-xl font-medium w-full text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.navLogin}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

    </>
  );
};

export default function LandingPage() {
  const country = useGeoCountry();
  const [langOverride, setLangOverride] = useState<'en' | 'ar' | null>(null);
  const isArabic = langOverride ? langOverride === 'ar' : ARABIC_COUNTRIES.includes(country);
  const t = isArabic ? contentAr : contentEn;
  const hero = t; // Hero section uses same keys
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const toggleLanguage = useCallback(() => {
    setLangOverride(prev => {
      const currentlyArabic = prev ? prev === 'ar' : ARABIC_COUNTRIES.includes(country);
      return currentlyArabic ? 'en' : 'ar';
    });
    // Reset video state on language switch
    setIsMuted(true);
    setIsPlaying(true);
  }, [country]);

  const handleVideoClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // If muted, first click unmutes and restarts from beginning
    if (video.muted) {
      video.currentTime = 0;
      video.muted = false;
      setIsMuted(false);
      return;
    }
    // Otherwise toggle play/pause
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F0FDFA]">
      <Navigation onLanguageToggle={toggleLanguage} isArabic={isArabic} t={t} />

      {/* ===== HERO SECTION ===== */}
      <section className="bg-[#F0FDFA] pt-24 sm:pt-28 pb-16">
        {/* OpenAI Badge */}
        <motion.div
          className="flex justify-center mb-6"
          {...fadeUp}
          transition={fadeUpTransition(0)}
        >
          <Link
            href="https://academy.openai.com/public/videos/andrew-omalley-medicine-2025-08-20"
            target="_blank"
            className="flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E0F2FE] hover:border-[#0891B2]/30 transition-colors duration-200"
          >
            <Sparkles className="w-3 h-3 text-[#0891B2]" />
            <span className="text-xs font-medium text-[#0891B2]">{t.openaiBadge}</span>
            <ExternalLink className="w-3 h-3 text-[#0891B2]" />
          </Link>
        </motion.div>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left column — Text content */}
            <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
              <motion.p
                className="font-heading text-xl sm:text-2xl text-[#0891B2] font-medium mb-4"
                {...fadeUp}
                transition={fadeUpTransition(0.1)}
              >
                {hero.subtitlePre} <span className="font-semibold text-[#0E7490]">{hero.subtitleNum}</span> {hero.subtitlePost}
              </motion.p>

              <motion.h1
                className={`font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#134E4A] tracking-tight leading-[1.1] mb-6 ${isArabic ? 'leading-[1.3]' : ''}`}
                {...fadeUp}
                transition={fadeUpTransition(0.2)}
              >
                {hero.headline}
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-[#64748B] mb-8 leading-relaxed max-w-xl"
                {...fadeUp}
                transition={fadeUpTransition(0.3)}
              >
                {hero.body}
              </motion.p>

              {/* CTA */}
              <motion.div
                className="mb-8"
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
                  {hero.cta1}
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${isArabic ? 'flex-row-reverse justify-end' : ''}`}
                {...fadeUp}
                transition={fadeUpTransition(0.5)}
              >
                <Link href="https://www.st-andrews.ac.uk/medicine/" target="_blank" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-200">
                  <Image
                    src="/shots/st anderws uni.png"
                    alt="University of St Andrews"
                    width={100}
                    height={50}
                    className="h-8 w-auto"
                  />
                  <span className="text-xs text-[#64748B] font-medium hidden sm:block whitespace-pre-line">{hero.trust}</span>
                </Link>
                <Link href="https://www.nes.scot.nhs.uk/" target="_blank" className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity duration-200">
                  <Image
                    src="/logo/NES_logo.jpg"
                    alt="NHS Education for Scotland"
                    width={100}
                    height={50}
                    className="h-9 w-auto rounded"
                  />
                  <span className="text-xs text-[#64748B] font-medium hidden sm:block whitespace-pre-line">{hero.trustNes}</span>
                </Link>
              </motion.div>
            </div>

            {/* Right column — Hero Video */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div
                className="clay-card overflow-hidden w-full max-w-[340px] sm:max-w-[380px] relative cursor-pointer group"
                onClick={handleVideoClick}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                  key={isArabic ? 'ar' : 'en'}
                >
                  <source src={isArabic ? '/videos/hero-ar.mp4' : '/videos/hero-en.mp4'} type="video/mp4" />
                </video>
                {/* Play/Pause overlay — visible on hover when playing, always visible when paused */}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    {isPlaying ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#134E4A"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#134E4A"><polygon points="8,4 20,12 8,20" /></svg>
                    )}
                  </div>
                </div>
                {/* Muted indicator — tap to unmute hint */}
                {isMuted && isPlaying && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-full bg-black/50 text-white text-xs flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                    <span>{t.tapForSound}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF STATS BAR ===== */}
      <section className="bg-white py-12 border-y border-[#E0F2FE]" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-4xl mx-auto grid grid-cols-3 gap-4 sm:gap-8 text-center px-4 ${isArabic ? 'font-arabic' : ''}`}>
          {[
            { end: 700, suffix: "+", label: t.statMedicalStudents },
            { end: 100, suffix: "+", label: t.statAiPatients },
            { end: 1, suffix: "+", label: t.statInstitutions },
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
      <section className="bg-[#F0FDFA] py-16 sm:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: MessageCircle,
                mode: t.modeText,
                description: t.modeTextDesc
              },
              {
                icon: Mic,
                mode: t.modeVoice,
                description: t.modeVoiceDesc
              },
              {
                icon: Video,
                mode: t.modeAvatar,
                description: t.modeAvatarDesc
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
      <section className="bg-white py-16 sm:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
          <motion.div className="text-center mb-12" {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              {t.videoTitle}
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              {t.videoSubtitle}
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
      <section className="bg-[#F0FDFA] py-16 sm:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
          <motion.h2
            className={`font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-12 text-center ${isArabic ? 'lg:text-right' : 'lg:text-left'}`}
            {...fadeUp}
            transition={fadeUpTransition(0.1)}
          >
            {t.diversityTitle}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} transition={fadeUpTransition(0.2)}>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mb-8">
                {t.diversityBody}
              </p>

              <div className="space-y-5">
                {[
                  { title: t.diversityItem1Title, desc: t.diversityItem1Desc },
                  { title: t.diversityItem2Title, desc: t.diversityItem2Desc },
                  { title: t.diversityItem3Title, desc: t.diversityItem3Desc },
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
      <section className="bg-white py-16 sm:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-8">
                {t.authorityTitle}
              </h2>

              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mb-8">
                {t.authorityBody}
              </p>

              <div className="flex flex-wrap gap-8 mb-8">
                {[
                  { end: 700, suffix: "+", label: t.statMedicalStudents },
                  { end: 100, suffix: "+", label: t.statAiPatients },
                  { end: 1, suffix: "+", label: t.statInstitution },
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
                {t.exploreResearch}
                <ExternalLink className={`w-4 h-4 ${isArabic ? 'mr-2' : 'ml-2'}`} />
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
      <section className="bg-[#F0FDFA] py-16 sm:py-20" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isArabic ? 'font-arabic' : ''}`}>
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-6">
              {t.personalizationTitle}
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.personalizationBody}
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
      <section className="bg-white py-16 sm:py-20 border-t border-[#E0F2FE]" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center ${isArabic ? 'font-arabic' : ''}`}>
          <motion.div {...fadeUp} transition={fadeUpTransition(0.1)}>
            <h2 className="font-heading text-3xl sm:text-4xl font-light text-[#134E4A] mb-4">
              {t.finalCtaTitle}
            </h2>
            <p className="text-lg text-[#64748B] mb-8">
              {t.finalCtaBody}
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
              endContent={<ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />}
            >
              {t.finalCtaPrimary}
            </Button>
            <Button
              as={Link}
              href="/book-demo"
              size="lg"
              className="bg-white text-[#0891B2] border-2 border-[#E0F2FE] hover:border-[#0891B2] px-6 py-3 rounded-xl font-medium text-base w-full sm:w-auto"
              startContent={<Play className="w-4 h-4" />}
            >
              {t.finalCtaSecondary}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#134E4A] text-white py-12" dir={isArabic ? 'rtl' : 'ltr'}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isArabic ? 'font-arabic' : ''}`}>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Image
                  src="/logo/SimLogo1.png"
                  alt="SimPatient AI Logo"
                  width={28}
                  height={28}
                  className="brightness-200"
                />
                <span className="font-heading text-lg font-semibold">Simpatient AI</span>
              </div>
              <p className="text-white/60 text-sm mb-4">{t.footerTagline}</p>
              <div className="text-white/50 text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  <Link href="mailto:hello@simpatient.co.uk" className="hover:text-white transition-colors duration-200" dir="ltr">
                    hello@simpatient.co.uk
                  </Link>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span className="whitespace-pre-line">{t.footerAddress}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link href="/blog" className="text-white/60 hover:text-white text-sm transition-colors duration-200">{t.navBlog}</Link>
              <Link href="/academic" className="text-white/60 hover:text-white text-sm transition-colors duration-200">{t.navResearch}</Link>
              <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors duration-200">{t.navAbout}</Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
