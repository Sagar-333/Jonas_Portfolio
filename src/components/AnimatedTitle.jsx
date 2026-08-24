import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass, className, lineClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile: trigger earlier as soon as title enters the viewport
      mm.add("(max-width: 767px)", () => {
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "center 70%",
            toggleActions: "play none none reverse",
          },
        });

        titleAnimation.to(
          ".animated-word",
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
            ease: "power2.inOut",
            stagger: 0.02,
          },
          0
        );
      });

      // Desktop / PC: unchanged
      mm.add("(min-width: 768px)", () => {
        const titleAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "100 bottom",
            end: "center bottom",
            toggleActions: "play none none reverse",
          },
        });

        titleAnimation.to(
          ".animated-word",
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
            ease: "power2.inOut",
            stagger: 0.02,
          },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, [title]);

  return (
    <div
      ref={containerRef}
      className={clsx("animated-title", containerClass, className)}
    >
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className={clsx(
            "flex-center max-w-full flex-wrap gap-1.5 px-2 sm:px-6 md:gap-3 md:px-10",
            lineClass
          )}
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
