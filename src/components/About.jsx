import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t } = useLanguage();

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=800 center",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      clipAnimation.to("#clip .mask-clip-path", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
      });
    });
  });

  return (
    <div id="about" className="min-h-screen w-full">
      <div className="relative mb-8 mt-20 flex flex-col items-center gap-5 px-4 text-center sm:mt-28 md:mt-36">
        <p className="font-general text-xs uppercase tracking-widest text-neutral-600 sm:text-sm md:text-[10px]">
          {t.about.philosophy}
        </p>

        <AnimatedTitle
          title={t.about.title}
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext px-4">
          <p className="font-medium text-neutral-900">{t.about.subtext1}</p>
          <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm md:text-base">
            {t.about.subtext2}
          </p>
        </div>
      </div>

      <div className="w-full px-4 pb-16 md:h-dvh md:overflow-hidden md:px-0 md:pb-0" id="clip">
        <div className="mask-clip-path about-image shadow-2xl md:shadow-none">
          <img
            src="img/gofundme-kart.jpg"
            alt="Jonas Strate-Jensen Karting"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
