import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi";

import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY && !isMobileMenuOpen) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobileMenuOpen]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-3 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-3 sm:p-4">
            {/* Logo and Driver Deck button */}
            <div className="flex items-center gap-3 sm:gap-6">
              <a href="#" className="group flex items-center gap-2">
                <img
                  src="/img/logo-white.png"
                  alt="Strate-Jensen Racing"
                  className="h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-9"
                />
              </a>

              <Button
                id="deck-button"
                title={t.nav.driverDeck}
                href="/docs/Jonas_Strate_Jensen_Driver_Deck.pdf"
                download="Jonas_Strate_Jensen_Driver_Deck.pdf"
                target="_blank"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-[#459cce] text-black font-semibold md:flex hidden items-center justify-center gap-1 hover:bg-white shadow-md shadow-[#459cce]/20 transition-all duration-300"
              />
            </div>

            {/* Navigation Links, Translate Switcher, Audio Button & Mobile Menu Toggle */}
            <div className="flex h-full items-center">
              <div className="hidden md:flex items-center">
                {t.nav.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="nav-hover-btn"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Language Switcher Button */}
              <div className="ml-3 flex items-center rounded-full bg-white/10 p-0.5 backdrop-blur-md border border-white/20 sm:ml-6">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wider transition-all duration-300 cursor-pointer",
                    language === "en"
                      ? "bg-[#459cce] text-white shadow-sm"
                      : "text-blue-100 hover:text-white"
                  )}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("da")}
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-[11px] font-bold tracking-wider transition-all duration-300 cursor-pointer",
                    language === "da"
                      ? "bg-[#459cce] text-white shadow-sm"
                      : "text-blue-100 hover:text-white"
                  )}
                  aria-label="Skift til Dansk"
                >
                  DA
                </button>
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="ml-2 flex items-center justify-center rounded-lg p-2 text-xl text-blue-50 transition-colors hover:bg-white/10 md:hidden"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-between bg-black/95 p-8 pt-28 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="font-general text-xs font-semibold uppercase tracking-widest text-neutral-500">
                {t.nav.navigation}
              </p>
              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center rounded-full bg-white/10 p-0.5 border border-white/20">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={clsx(
                    "rounded-full px-2.5 py-1 text-xs font-bold transition-all",
                    language === "en"
                      ? "bg-[#459cce] text-white"
                      : "text-blue-100"
                  )}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("da")}
                  className={clsx(
                    "rounded-full px-2.5 py-1 text-xs font-bold transition-all",
                    language === "da"
                      ? "bg-[#459cce] text-white"
                      : "text-blue-100"
                  )}
                >
                  DA
                </button>
              </div>
            </div>

            {t.nav.items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-zentry text-3xl font-black uppercase text-blue-50 transition-colors hover:text-[#459cce]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
            <Button
              id="mobile-deck-button"
              title={t.nav.driverDeck}
              href="/docs/Jonas_Strate_Jensen_Driver_Deck.pdf"
              download="Jonas_Strate_Jensen_Driver_Deck.pdf"
              target="_blank"
              onClick={() => setIsMobileMenuOpen(false)}
              rightIcon={<TiLocationArrow />}
              containerClass="bg-[#459cce] text-black font-semibold w-full flex-center gap-2 hover:bg-white transition-all duration-300"
            />
            <p className="text-center font-general text-xs text-neutral-500">
              {t.nav.officialPortfolio}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
