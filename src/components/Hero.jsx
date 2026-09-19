import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef } from "react";

import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const heroVideoRef = useRef(null);

  // Safari autoplay fix:
  // 1. React bug #10389 — `muted` prop isn't reliably applied to the DOM.
  //    Safari checks the DOM property, so we must force it via ref.
  // 2. Try to play on mount, on data ready, and on first user interaction.
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Force muted on the DOM element — critical for Safari
    video.defaultMuted = true;
    video.muted = true;

    const tryPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // Last resort: play on first user interaction (scroll/click/touch)
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

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-full overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          ref={heroVideoRef}
          src="videos/hero-1.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute left-0 top-0 size-full object-cover object-center"
        />

        <h1
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
          dangerouslySetInnerHTML={{ __html: t.hero.headingDriven }}
        />

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-20 px-4 sm:mt-24 sm:px-10">
            <p className="mb-2 font-general text-xs font-semibold uppercase tracking-widest text-blue-100">
              {t.hero.tagline}
            </p>

            <h1
              className="special-font hero-heading text-blue-100"
              dangerouslySetInnerHTML={{ __html: t.hero.headingSpeed }}
            />

            <p className="mb-5 max-w-72 font-robert-regular text-xs leading-relaxed text-blue-100 sm:text-base">
              {t.hero.description} <br /> {t.hero.descriptionLine2}
            </p>

            <Button
              id="hero-deck-button"
              title={t.hero.driverDeck || t.nav.driverDeck || "Driver Profile"}
              href="/docs/Jonas_Strate_Jensen_Driver_Deck.pdf"
              download="Jonas_Strate_Jensen_Driver_Deck.pdf"
              target="_blank"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#459cce] text-black font-semibold flex-center gap-1 hover:bg-white shadow-md shadow-[#459cce]/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      <h1
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
        dangerouslySetInnerHTML={{ __html: t.hero.headingDriven }}
      />
    </div>
  );
};

export default Hero;
