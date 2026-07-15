import { trackCtaClick, trackDocsClick } from "@/lib/analytics";
import AnnouncementBadge from "@/components/AnnouncementBadge";
import { Button } from "@/components/Button";
import { HeroHeading } from "@/components/LandingPrimitives";

const Hero = () => {
  return (
    <section className="relative w-full pt-[58px] md:pt-[94px]">
      <div className="relative flex flex-col items-center pt-20 md:pt-[120px] pb-0 px-5 md:px-8 max-w-container mx-auto w-full">
        <div className="flex flex-col items-center gap-6 w-full hero-fade-1">

          {/* Platform badge */}
          <AnnouncementBadge pill="Soon">
            Bucket Intelligence &amp; AI Agent Toolkit
          </AnnouncementBadge>

          <HeroHeading
            title={<>S3 object storage built <br className="sm:hidden" />for the AI era</>}
            description={<>Your data, your keys, your control.<br />For when every byte matters.</>}
            titleMaxWidth={520}
            descriptionMaxWidth={600}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-row items-center justify-center gap-3 mt-10 hero-fade-2">
          <Button variant="primary" href="https://app.fil.one/login?screen_hint=signup" onClick={() => trackCtaClick("Start for free", "https://app.fil.one/login?screen_hint=signup", "primary")}>
            Start for free
          </Button>
          <Button variant="secondary" href="https://docs.fil.one" target="_blank" rel="noopener noreferrer" onClick={() => { trackCtaClick("Explore docs", "https://docs.fil.one", "secondary"); trackDocsClick("https://docs.fil.one"); }}>
            Explore docs
          </Button>
        </div>

        {/* Tagline */}
        <p className="mt-4 hero-fade-3 text-center font-sans text-[13px] font-normal leading-[1.5] text-zinc-500">
          1TB free for 30 days · No credit card required · No egress fees
        </p>
      </div>
    </section>
  );
};

export default Hero;
