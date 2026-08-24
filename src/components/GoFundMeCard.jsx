import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";

const DIRECT_CAMPAIGN_URL =
  "https://www.gofundme.com/f/support-my-2027-karting-season-journey-3jpe3";

export const GoFundMeCard = () => {
  const { t } = useLanguage();

  // Dynamic campaign state with fallback defaults
  const [campaignData, setCampaignData] = useState({
    raised: 4676,
    goal: 50000,
    donations: 9,
    formattedRaised: "kr 4,676",
    formattedGoal: "50,000 DKK",
  });

  // Calculate percentage dynamically
  const percentage = Math.min(
    Math.round((campaignData.raised / campaignData.goal) * 100),
    100
  );

  // Fetch live campaign updates on mount and periodically
  useEffect(() => {
    let isMounted = true;

    const fetchLiveStats = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/raw?url=${encodeURIComponent(DIRECT_CAMPAIGN_URL)}`
        );
        if (!res.ok) return;
        const html = await res.text();

        // Extract current amount raised
        const raisedMatch =
          html.match(/<span>(kr\s*[\d,]+)<\/span>\s*<!-- -->raised/i) ||
          html.match(/kr\s*([\d,]+)\s*<!-- -->\s*raised/i);

        // Extract donation count
        const countMatch = html.match(/(\d+)\s+donations/i);

        if (isMounted && (raisedMatch || countMatch)) {
          setCampaignData((prev) => {
            const rawRaisedStr = raisedMatch ? raisedMatch[1].replace(/[^\d]/g, "") : null;
            const newRaised = rawRaisedStr ? parseInt(rawRaisedStr, 10) : prev.raised;
            const newCount = countMatch ? parseInt(countMatch[1], 10) : prev.donations;

            return {
              ...prev,
              raised: newRaised,
              donations: newCount,
              formattedRaised: raisedMatch ? raisedMatch[1].trim() : prev.formattedRaised,
            };
          });
        }
      } catch (err) {
        // Silently fall back to baseline numbers
      }
    };

    fetchLiveStats();

    // Poll every 2 minutes for updates while visitor is on page
    const interval = setInterval(fetchLiveStats, 120000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative size-full min-h-[380px] overflow-hidden rounded-md border border-white/10 bg-black/90">
      {/* Background Image of Jonas in his Kart */}
      <img
        src="/img/gofundme-kart.jpg"
        alt="Jonas Strate-Jensen Karting"
        className="absolute left-0 top-0 size-full object-cover object-center brightness-[0.45] transition-transform duration-700 hover:scale-105"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

      {/* Foreground Content */}
      <div className="relative z-10 flex size-full min-h-[380px] flex-col justify-between p-5 text-blue-50 sm:p-6">
        {/* Top Header */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-[#459cce]/30 bg-black/60 px-3 py-1 backdrop-blur-md">
              <span className="size-2 rounded-full bg-[#459cce] animate-pulse" />
              <span className="font-general text-[10px] font-semibold uppercase tracking-wider text-[#459cce]">
                {t.features.gofundme?.badge || "Official Campaign"}
              </span>
            </div>

            <a
              href={DIRECT_CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-xs text-white/70 transition-colors hover:text-[#459cce]"
            >
              <FaHeart className="text-[#459cce] transition-transform group-hover:scale-110" />
              <span className="font-general text-[11px] uppercase tracking-wider">GoFundMe</span>
              <TiLocationArrow className="text-sm transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          <h1
            className="bento-title special-font text-white"
            dangerouslySetInnerHTML={{
              __html: t.features.gofundme?.title || "2027 K<b>A</b>RTING <b>J</b>OURNEY",
            }}
          />

          <p className="mt-2 max-w-sm font-circular-web text-xs leading-relaxed text-blue-100/80 sm:text-sm">
            {t.features.gofundme?.desc ||
              "Support Jonas's 2027 European & World championship karting campaign — funding race engines, tires & telemetry."}
          </p>
        </div>

        {/* Campaign Stats & Progress Card */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/60 p-3.5 backdrop-blur-md">
          {/* Progress Numbers */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg font-black text-white sm:text-xl">
                {campaignData.formattedRaised}
              </span>
              <span className="ml-1 text-xs text-white/50">
                / {campaignData.formattedGoal}
              </span>
            </div>
            <span className="rounded-md bg-[#459cce]/20 px-2 py-0.5 font-general text-xs font-bold text-[#459cce]">
              {percentage}%
            </span>
          </div>

          {/* Glowing Progress Bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#459cce] to-[#7acbf7] shadow-[0_0_12px_#459cce] transition-all duration-1000"
              style={{ width: `${Math.max(percentage, 8)}%` }}
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-general text-[11px] text-white/60">
              {campaignData.donations} {t.features.gofundme?.donations || "Donations"} •{" "}
              {t.features.gofundme?.targetTag || "2027 Target"}
            </span>

            <a
              href={DIRECT_CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 rounded-full bg-[#459cce] px-4 py-2 text-xs font-bold text-black transition-all hover:bg-white hover:shadow-lg hover:shadow-[#459cce]/30"
            >
              <span>{t.features.gofundme?.donateBtn || "Support Campaign"}</span>
              <TiLocationArrow className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoFundMeCard;
