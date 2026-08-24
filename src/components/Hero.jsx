import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

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

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-full overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-full overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-full overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-48 cursor-pointer overflow-hidden rounded-lg sm:size-64">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-75 opacity-70 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 sm:scale-50 sm:opacity-0"
              >
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-48 origin-center scale-150 object-cover object-center sm:size-64"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-48 object-cover object-center sm:size-64"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

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
              id="watch-reel"
              title={t.hero.watchReel}
              leftIcon={<TiLocationArrow />}
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
