import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import { useLanguage } from "../context/LanguageContext";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const { t } = useLanguage();

  return (
    <div id="contact" className="mb-16 min-h-96 w-full px-4 sm:mb-20 sm:px-10">
      <div className="relative overflow-hidden rounded-b-2xl bg-black py-16 text-blue-50 sm:py-24">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute top-1/2 hidden w-60 -translate-y-1/2 sm:block md:left-auto md:right-10 md:translate-y-0 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center px-4 text-center">
          <p className="mb-6 font-general text-xs uppercase tracking-widest text-neutral-400 sm:mb-10">
            {t.contact.tagline}
          </p>

          <AnimatedTitle
            title={t.contact.title}
            containerClass="special-font !text-3xl sm:!text-5xl md:!text-[5.5rem] lg:!text-[6.2rem] w-full font-zentry !font-black !leading-[.95] md:!leading-[.9]"
          />

          <Button
            id="contact-btn"
            title={t.contact.contactButton}
            containerClass="mt-8 sm:mt-10 cursor-pointer bg-[#459cce] text-black font-semibold hover:bg-white shadow-lg shadow-[#459cce]/20 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
