import gsap from "gsap";
import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import { useLanguage } from "../context/LanguageContext";

const FloatingImage = () => {
  const { t } = useLanguage();
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="journey" className="min-h-dvh w-full overflow-hidden bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-16 sm:py-20 sm:pb-24">
        <p className="font-general text-xs uppercase tracking-widest text-neutral-400 sm:text-sm md:text-[10px]">
          {t.story.tagline}
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title={t.story.title}
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="Jonas Strate-Jensen Journey"
                  className="max-h-[50vh] object-contain md:max-h-none"
                />
              </div>
            </div>

            {/* for the rounded corner */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="z-20 -mt-16 flex w-full justify-center px-4 sm:-mt-36 sm:px-6 md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-xs leading-relaxed text-violet-50/90 sm:text-sm md:text-start md:text-base">
              {t.story.description}
            </p>

            <Button
              id="bio-btn"
              title={t.story.bioButton}
              href="https://www.gofundme.com/f/support-my-2027-karting-season-journey-3jpe3"
              target="_blank"
              rightIcon={<TiLocationArrow />}
              containerClass="mt-5 bg-[#459cce] text-black font-semibold hover:bg-white transition-all flex-center gap-1.5 shadow-md shadow-[#459cce]/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
