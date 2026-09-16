import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";
import GoFundMeCard from "./GoFundMeCard";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, comingSoonText = "Milestone" }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);

  // Safari autoplay fix:
  // 1. React bug #10389 — `muted` prop isn't reliably applied to the DOM.
  // 2. Combine IntersectionObserver + readiness events + user-interaction fallback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted on the DOM element — critical for Safari
    video.defaultMuted = true;
    video.muted = true;

    let isVisible = false;

    const tryPlay = () => {
      if (isVisible) {
        video.muted = true;
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          tryPlay();
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    observer.observe(video);

    // Last resort: play on first user interaction
    const playOnInteraction = () => {
      tryPlay();
      interactionCleanup();
    };
    const interactionCleanup = () => {
      document.removeEventListener("scroll", playOnInteraction);
      document.removeEventListener("click", playOnInteraction);
      document.removeEventListener("touchstart", playOnInteraction);
    };
    document.addEventListener("scroll", playOnInteraction, { passive: true });
    document.addEventListener("click", playOnInteraction);
    document.addEventListener("touchstart", playOnInteraction, { passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      interactionCleanup();
    };
  }, []);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full overflow-hidden rounded-md">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        autoPlay
        playsInline
        preload="metadata"
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 text-blue-50 sm:p-6">
        <div>
          <h1
            className="bento-title special-font"
            dangerouslySetInnerHTML={typeof title === "string" ? { __html: title } : undefined}
          >
            {typeof title !== "string" ? title : null}
          </h1>
          {description && (
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-blue-100/80 sm:mt-3 sm:text-sm">
              {description}
            </p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative mt-4 flex w-fit cursor-pointer items-center gap-1.5 overflow-hidden rounded-full bg-black/80 px-4 py-1.5 text-[10px] uppercase text-white/50 backdrop-blur-sm sm:px-5 sm:py-2 sm:text-xs"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #459cce88, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20 text-[#459cce]" />
            <p className="relative z-20 font-general">{comingSoonText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const { t } = useLanguage();

  return (
    <section id="disciplines" className="bg-black pb-24 sm:pb-52">
      <div className="container mx-auto px-4 md:px-10">
        <div className="px-2 py-16 sm:px-5 sm:py-32">
          <p className="font-circular-web text-base text-blue-50 sm:text-lg">
            {t.features.arenaTag}
          </p>
          <p className="mt-1 max-w-lg font-circular-web text-sm text-blue-50 opacity-60 sm:text-base md:text-lg">
            {t.features.arenaDescription}
          </p>
        </div>

        {/* Top Feature: 1st Team Academy Driver */}
        <BentoTilt className="border-hsla relative mb-5 h-80 w-full overflow-hidden rounded-md sm:mb-7 sm:h-96 md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={t.features.academyTitle}
            description={t.features.academyDesc}
            isComingSoon
            comingSoonText={t.features.comingSoon}
          />
        </BentoTilt>

        {/* 2-Column Responsive Layout */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-7 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-5 md:gap-7">
            {/* Le Mans Mentorship Card */}
            <BentoTilt className="bento-tilt_1 h-80 sm:h-96 md:h-[480px]">
              <BentoCard
                src="videos/feature-2.mp4"
                title={t.features.mentorshipTitle}
                description={t.features.mentorshipDesc}
                isComingSoon
                comingSoonText={t.features.comingSoon}
              />
            </BentoTilt>

            {/* October 2026 Race Debut Card */}
            <BentoTilt className="bento-tilt_2 h-64 sm:h-80 md:h-[320px]">
              <div className="flex size-full flex-col justify-between rounded-md bg-[#459cce] p-5 sm:p-6 shadow-lg shadow-[#459cce]/20">
                <div>
                  <h1
                    className="bento-title special-font max-w-64 text-black font-black"
                    dangerouslySetInnerHTML={{ __html: t.features.debutTitle }}
                  />
                  {t.features.debutDesc && (
                    <p className="mt-2 font-circular-web text-xs font-semibold text-black/80 sm:text-sm">
                      {t.features.debutDesc}
                    </p>
                  )}
                </div>

                <TiLocationArrow className="m-3 scale-[3] self-end text-black sm:m-5 sm:scale-[5]" />
              </div>
            </BentoTilt>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-5 md:gap-7">
            {/* 23,000 DKK Self-Funded Grit Card */}
            <BentoTilt className="bento-tilt_1 h-72 sm:h-80 md:h-[240px]">
              <BentoCard
                src="videos/feature-3.mp4"
                title={t.features.gritTitle}
                description={t.features.gritDesc}
                isComingSoon
                comingSoonText={t.features.comingSoon}
              />
            </BentoTilt>

            {/* GoFundMe Official Card */}
            <BentoTilt className="bento-tilt_1 w-full">
              <GoFundMeCard />
            </BentoTilt>

            {/* Road to Le Mans GT3 Card */}
            <BentoTilt className="bento-tilt_2 h-56 sm:h-64 md:h-[200px]">
              <BentoCard
                src="videos/feature-5.mp4"
                title={t.features.targetTitle}
                description={t.features.targetDesc}
                isComingSoon={false}
              />
            </BentoTilt>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
