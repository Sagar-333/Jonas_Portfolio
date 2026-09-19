import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const dividerTopRef = useRef(null);
  const dividerBottomRef = useRef(null);
  const taglineRef = useRef(null);
  const ctaRef = useRef(null);

  // Safari autoplay fix
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    const playOnInteraction = () => {
      tryPlay();
      cleanup();
    };
    const cleanup = () => {
      document.removeEventListener("scroll", playOnInteraction);
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
    };
    document.addEventListener("scroll", playOnInteraction, { once: true, passive: true });
    document.addEventListener("click", playOnInteraction, { once: true });
    document.addEventListener("touchstart", playOnInteraction, { once: true, passive: true });

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      cleanup();
    };
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top divider line scales in
      gsap.fromTo(
        dividerTopRef.current,
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Tagline fades up
      gsap.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // CTA group staggers in
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Bottom divider line scales in
      gsap.fromTo(
        dividerBottomRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: dividerBottomRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="contact" ref={sectionRef} className="mb-16 min-h-96 w-full px-4 sm:mb-20 sm:px-10">
      <div className="relative overflow-hidden rounded-b-2xl bg-black text-blue-50">

        {/* ── Full-bleed background video ── */}
        <video
          ref={videoRef}
          src="videos/feature-4.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover"
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)]" />

        {/* ── Content wrapper ── */}
        <div className="relative z-10 px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-28 md:py-36">

          {/* Top decorative divider */}
          <div
            ref={dividerTopRef}
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/25 to-transparent mb-12 sm:mb-16 md:mb-20"
          />

          {/* Center content */}
          <div className="flex flex-col items-center text-center">
            <p
              ref={taglineRef}
              className="mb-8 font-general text-[10px] sm:text-xs uppercase tracking-[0.3em] text-neutral-400 sm:mb-12"
            >
              {t.contact.tagline}
            </p>

            <AnimatedTitle
              title={t.contact.title}
              containerClass="special-font !text-3xl sm:!text-5xl md:!text-[5.5rem] lg:!text-[6.2rem] w-full font-zentry !font-black !leading-[.95] md:!leading-[.9]"
            />

            <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4 sm:mt-14">
              <Button
                id="contact-btn"
                title={t.contact.contactButton}
                href="mailto:Jonas@strate.dk?subject=Inquiry%20-%20Jonas%20Strate-Jensen"
                rightIcon={<TiLocationArrow />}
                containerClass="cursor-pointer bg-[#459cce] text-black font-semibold hover:bg-white shadow-lg shadow-[#459cce]/20 transition-all flex-center gap-1.5"
              />

              {t.contact.directEmail && (
                <a
                  href="mailto:Jonas@strate.dk"
                  className="font-general text-[10px] sm:text-xs tracking-[0.2em] text-white/40 transition-colors hover:text-[#459cce]"
                >
                  {t.contact.directEmail}
                </a>
              )}
            </div>
          </div>

          {/* Bottom tagline bar */}
          <div className="mt-16 sm:mt-20 md:mt-28 flex items-center gap-4">
            <div
              ref={dividerBottomRef}
              className="h-[1px] flex-1 bg-white/10"
            />
            <p className="font-general text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/20 whitespace-nowrap">
              {t.contact.tagline}
            </p>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
