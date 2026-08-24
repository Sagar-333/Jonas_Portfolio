import { FaInstagram, FaTiktok, FaYoutube, FaEnvelope, FaHeart } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/jonasstratejensen/",
    icon: <FaInstagram />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@jonas.stratejensen",
    icon: <FaTiktok />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Strate_Racing",
    icon: <FaYoutube />,
  },
  {
    name: "GoFundMe",
    href: "https://www.gofundme.com/f/support-my-2027-karting-season-journey-3jpe3",
    icon: <FaHeart />,
  },
  {
    name: "Email",
    href: "mailto:Jonas@strate.dk",
    icon: <FaEnvelope />,
  },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="w-full overflow-hidden bg-[#459cce] py-6 text-black sm:py-5">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-8 md:flex-row">
        <p className="text-center text-xs font-semibold text-black/90 sm:text-sm md:text-left">
          © Jonas Strate-Jensen {new Date().getFullYear()}. {t.footer.rights}
        </p>

        <div className="flex items-center justify-center gap-5 sm:gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-lg text-black transition-all duration-300 hover:scale-115 hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-black/90">
          <span>{t.footer?.location || "Copenhagen, Denmark"}</span>
          <span>•</span>
          <a
            href="mailto:Jonas@strate.dk"
            className="hover:underline hover:text-white transition-colors"
          >
            Jonas@strate.dk
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
