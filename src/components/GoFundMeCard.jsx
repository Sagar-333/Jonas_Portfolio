import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";

const DIRECT_CAMPAIGN_URL =
  "https://www.gofundme.com/f/support-my-2027-karting-season-journey-3jpe3";

export const GoFundMeCard = () => {
  const { t } = useLanguage();

  return (
    <div className="group relative size-full min-h-[260px] sm:min-h-[280px] overflow-hidden rounded-md border border-white/10 bg-black">
      {/* Background Image of Jonas in his Kart */}
      <img
        src="/img/gofundme-kart.jpg"
        alt="Jonas Strate-Jensen Karting"
        className="absolute left-0 top-0 size-full object-cover object-center brightness-[0.5] transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

      {/* Foreground Content */}
      <div className="relative z-10 flex size-full min-h-[260px] sm:min-h-[280px] flex-col justify-between p-5 text-blue-50 sm:p-6">
        {/* Top Section */}
        <div>
          <h1
            className="bento-title special-font text-white"
            dangerouslySetInnerHTML={{
              __html: t.features.gofundme?.title || "2027 K<b>A</b>RTING <b>J</b>OURNEY",
            }}
          />

          <p className="mt-2 max-w-sm font-circular-web text-xs leading-relaxed text-blue-100/80 sm:text-sm">
            {t.features.gofundme?.desc ||
              "Support Jonas's championship karting campaign towards the Zealand Championship & beyond — funding race engines, tire sets, telemetry analysis & track entries."}
          </p>
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-4 pt-2">
          <a
            href={DIRECT_CAMPAIGN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#459cce] px-5 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#459cce]/25 transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[#459cce]/40"
          >
            <span>{t.features.gofundme?.donateBtn || "Support Campaign"}</span>
            <TiLocationArrow className="text-base" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default GoFundMeCard;

