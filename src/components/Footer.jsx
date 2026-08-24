import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const socialLinks = [
  { href: "https://instagram.com", icon: <FaInstagram /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://linkedin.com", icon: <FaLinkedin /> },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="w-full overflow-hidden bg-[#459cce] py-6 text-black sm:py-4">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-8 md:flex-row">
        <p className="text-center text-xs font-medium text-black/90 sm:text-sm md:text-left">
          © Jonas Strate-Jensen {new Date().getFullYear()}. {t.footer.rights}
        </p>

        <div className="flex justify-center gap-6 md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-black transition-colors duration-300 hover:text-white"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#privacy-policy"
          className="text-center text-xs font-medium text-black/90 hover:underline sm:text-sm md:text-right"
        >
          {t.footer.privacy}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
