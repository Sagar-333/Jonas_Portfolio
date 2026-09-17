import { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

/* ── Styled Sponsor Card ── */
const StyledSponsorCard = styled.a`
  display: block;
  text-decoration: none;

  .wrapper,
  .wrapper * {
    box-sizing: border-box;
  }

  .wrapper {
    width: 300px;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    position: relative;
    font-family: "Space Grotesk", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #111;
    cursor: pointer;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .card {
    position: absolute;
    inset: 0;
    width: 110%;
    height: 110%;
    translate: -5% -5%;
    filter: url("#noise");
    --c1: #0a1628;
    --c2: #459cce;
    --c3: #1a3a5c;
    background: radial-gradient(
        circle at 50% 100%,
        var(--c1) 20%,
        var(--c2) 40% 50%,
        var(--c3) 55%
      )
      no-repeat center / auto;
    z-index: 0;
  }

  .content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 24px 24px 20px;
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: #ffffff;
  }

  .logo-img {
    width: 80%;
    height: auto;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
      filter 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .desc {
    color: rgba(255, 255, 255, 0.75);
    font-size: 12px;
    font-weight: 300;
    line-height: 1.55;
    letter-spacing: 0.02em;
    transition: color 0.5s cubic-bezier(0.25, 1, 0.5, 1),
      letter-spacing 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .cta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 255, 255, 0.4);
    transition: color 0.5s cubic-bezier(0.25, 1, 0.5, 1),
      transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .cta-arrow {
    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    font-size: 13px;
  }

  .wrapper:hover {
    box-shadow: 0 20px 50px rgba(69, 156, 206, 0.15);
  }

  .wrapper:hover .logo-img {
    transform: translateY(-2px);
    filter: drop-shadow(0 6px 16px rgba(69, 156, 206, 0.3));
  }

  .wrapper:hover .desc {
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: 0.04em;
  }

  .wrapper:hover .cta {
    color: #459cce;
    transform: translateY(-1px);
  }

  .wrapper:hover .cta-arrow {
    transform: translateX(4px);
  }
`;



const Partnerships = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef(null);
  const dividerRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile
      mm.add("(max-width: 767px)", () => {
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

        if (cardsRef.current) {
          const cards = cardsRef.current.children;
          gsap.fromTo(
            cards,
            { y: 35, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // Desktop
      mm.add("(min-width: 768px)", () => {
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

        if (cardsRef.current) {
          const cards = cardsRef.current.children;
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
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
      {/* Hidden SVG noise filter */}
      <svg
        style={{ width: 0, height: 0, position: "absolute" }}
        aria-hidden="true"
      >
        <filter id="noise">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.9"
            numOctaves={2}
            seed={1}
            stitchTiles="stitch"
            result="turbulence"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={30}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Main container — black bg */}
      <div className="relative mx-4 sm:mx-10 overflow-hidden rounded-t-2xl bg-black py-16 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-28">

        {/* ── Top-right hero image ── */}
        <div
          ref={heroImageRef}
          className="pointer-events-none absolute top-0 right-0 hidden sm:block w-[55%] md:w-[48%] lg:w-[42%] h-[75%] md:h-[88%] lg:h-[95%] overflow-hidden"
          style={{ clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 82%)" }}
        >
          <img
            src="/img/Partnership.jpg"
            alt="Jonas Strate-Jensen Partnership"
            className="size-full object-cover object-[53%_25%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/25 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>

        {/* ── Heading with AnimatedTitle ── */}
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

        {/* ── Content grid: Button on left, sponsor cards on right ── */}
        <div className="relative z-10 mt-10 sm:mt-14 md:mt-16 flex flex-col md:flex-row md:items-start gap-10 md:gap-16 lg:gap-20">
          {/* Left side - CTA */}
          <div ref={buttonRef} className="shrink-0">
            <Button
              id="partner-btn"
              title={t.partnerships?.button || "Become a Partner"}
              href="mailto:Jonas@strate.dk?subject=Partnership%20Inquiry%20-%20Jonas%20Strate-Jensen"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#459cce] text-black font-semibold hover:bg-white transition-all duration-300 shadow-lg shadow-[#459cce]/20 flex-center gap-1.5"
            />
          </div>

          {/* Right side - Sponsor cards */}
          <div
            ref={cardsRef}
            className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Card 1: Stratefoto – Photography Partner */}
            <StyledSponsorCard
              href="http://stratefoto.dk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="wrapper">
                <div className="card" />
                <div className="content">
                  <div className="top">
                    <div className="badge">
                      {t.partnerships?.sponsorBadge || "OFFICIAL PHOTOGRAPHY PARTNER"}
                    </div>
                    <img
                      src="/img/stratefoto-logo.jpg"
                      alt="Stratefoto.dk"
                      className="logo-img"
                    />
                  </div>
                  <div className="bottom">
                    <p className="desc">
                      {t.partnerships?.cardBio ||
                        "Sports, wedding & event photography. Capturing every decisive moment with world-class precision."}
                    </p>
                    <div className="cta">
                      <span>{t.partnerships?.visitSponsor || "LEARN MORE"}</span>
                      <span className="cta-arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </StyledSponsorCard>


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
