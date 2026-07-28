import { AboutBand } from "@/components/(landing)/sections/AboutBand";
import { CampusSection } from "@/components/(landing)/sections/CampusSection";
import { HeroSection } from "@/components/(landing)/sections/HeroSection";
import {
  PromoKosSection,
  PromoNgebutSection,
  RecommendationSection,
} from "@/components/(landing)/sections/KosRailSections";
import { PopularAreaSection } from "@/components/(landing)/sections/PopularAreaSection";
import { PromoBannerSection } from "@/components/(landing)/sections/PromoBannerSection";
import { ServiceHighlights } from "@/components/(landing)/sections/ServiceHighlights";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <PromoBannerSection />
      <ServiceHighlights />
      <PromoNgebutSection />
      <RecommendationSection />
      <PromoKosSection />
      <PopularAreaSection />
      <CampusSection />
      <AboutBand />
    </>
  );
}
