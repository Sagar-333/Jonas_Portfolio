import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Partner logos as styled text components (matching the reference design aesthetic)
const partners = [
  { name: "Red Bull Racing", display: "RED BULL", style: "font-black text-2xl sm:text-3xl md:text-4xl tracking-tighter" },
  { name: "Sparco", display: "SPARCO", style: "font-black text-2xl sm:text-3xl md:text-4xl tracking-widest" },
  { name: "OMP Racing", display: "OMP", style: "font-black text-3xl sm:text-4xl md:text-5xl tracking-tight italic" },
  { name: "Motorsport.com", display: "Motorsport", style: "font-light text-xl sm:text-2xl md:text-3xl tracking-wide italic" },
  { name: "Arai Helmets", display: "ARAI", style: "font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.3em]" },
  { name: "Stilo Helmets", display: "STILO", style: "font-bold text-2xl sm:text-3xl md:text-4xl tracking-widest" },
  { name: "P1 Advanced Racewear", display: "P1", style: "font-black text-3xl sm:text-4xl md:text-5xl tracking-tight" },
];

const Partnerships = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const logosRef = useRef(null);
  const dividerRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile: trigger promptly as section enters viewport
      mm.add("(max-width: 767px)", () => {
        // Divider line animation
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Button reveal
        gsap.fromTo(
          buttonRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Logo items stagger animation
        const logoItems = logosRef.current?.querySelectorAll(".partner-logo-item");
        if (logoItems?.length) {
          gsap.fromTo(
            logoItems,
            {
              y: 35,
              opacity: 0,
              scale: 0.95,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: logosRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Desktop / PC: untouched
      mm.add("(min-width: 768px)", () => {
        // Hero image — slide in from right with scale
        if (heroImageRef.current) {
          gsap.fromTo(
            heroImageRef.current,
            { x: 100, opacity: 0, scale: 0.85 },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Divider line animation
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Button reveal
        gsap.fromTo(
          buttonRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Logo items stagger animation (entrance only — no floating)
        const logoItems = logosRef.current?.querySelectorAll(".partner-logo-item");
        if (logoItems?.length) {
          gsap.fromTo(
            logoItems,
            {
              y: 50,
              opacity: 0,
              scale: 0.9,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: logosRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="partners"
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-8 sm:pt-12"
    >
      {/* Main container — black bg */}
      <div className="relative mx-4 sm:mx-10 overflow-hidden rounded-t-2xl bg-black py-16 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28">

        {/* ── Top-right hero image ── */}
        <div
          ref={heroImageRef}
          className="absolute top-0 right-0 hidden sm:block w-[40%] md:w-[35%] lg:w-[30%] h-[65%] overflow-hidden"
          style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 85%)" }}
        >
          <img
            src="/img/about.webp"
            alt=""
            className="size-full object-cover opacity-60"
          />
          {/* Gradient overlay to blend into the black bg */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* ── Heading with AnimatedTitle (same 3D word animation as Contact) ── */}
        <div className="relative z-10">
          <AnimatedTitle
            title={t.partnerships?.title || "Partn<b>e</b>rships."}
            containerClass="special-font !text-[2.5rem] sm:!text-[3.5rem] md:!text-[5rem] lg:!text-[6.5rem] !px-0 !items-start !text-left w-full font-zentry !font-black !leading-[1] tracking-tight !text-white"
            lineClass="!justify-start !px-0"
          />
        </div>

        {/* ── Divider line ── */}
        <div
          ref={dividerRef}
          className="relative z-10 mt-8 sm:mt-12 h-[1px] w-full bg-white/15"
        />

        {/* ── Content grid: Button on left, logos on right ── */}
        <div className="relative z-10 mt-10 sm:mt-14 md:mt-16 flex flex-col md:flex-row md:items-start gap-10 md:gap-16 lg:gap-20">
          {/* Left side - CTA */}
          <div ref={buttonRef} className="shrink-0">
            <Button
              id="partner-btn"
              title={t.partnerships?.button || "Become a Partner"}
              containerClass="bg-[#459cce] text-black font-semibold hover:bg-white transition-all duration-300 shadow-lg shadow-[#459cce]/20"
            />
          </div>

          {/* Right side - Partner logos grid */}
          <div
            ref={logosRef}
            className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-14 md:gap-x-16 md:gap-y-16 items-center"
          >
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="partner-logo-item group relative flex items-center justify-center py-3 cursor-default"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-xl bg-[#459cce]/0 group-hover:bg-[#459cce]/5 transition-colors duration-500" />

                {/* Partner text logo */}
                <span
                  className={`relative select-none text-white/70 transition-all duration-500 group-hover:text-white group-hover:scale-105 ${partner.style}`}
                  title={partner.name}
                >
                  {partner.display}
                </span>

                {/* Underline reveal on hover */}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#459cce] transition-all duration-500 group-hover:w-3/4" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom tagline ── */}
        <div className="relative z-10 mt-16 sm:mt-20 md:mt-24 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-white/10" />
          <p className="font-general text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">
            {t.partnerships?.tagline || "Racing Forward Together"}
          </p>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Partnerships;
