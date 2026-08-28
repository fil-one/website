import ctaBg from "../assets/enter-hyperspace-cta-background.png";
import { useInView } from "@/hooks/useInView";
import { trackCtaClick } from "@/lib/analytics";
import { Button } from "@/components/Button";
import { signupUrl } from "@/lib/console-url";

const CtaSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="flex flex-col items-center px-5 md:px-8 py-16 md:py-20 w-full bg-white">
      {/* Dark card */}
      <div
        ref={ref}
        className={`flex flex-col gap-8 items-center justify-center text-center w-full max-w-container px-8 py-20 md:py-32 rounded-[28px] min-h-[320px] reveal${inView ? " in-view" : ""}`}
        style={{
          backgroundImage: `url(${ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-4 items-center max-w-[260px] md:max-w-[420px]">
          <h2
            className="font-display font-medium text-white text-[26px] md:text-[32px]"
            style={{ lineHeight: "1.2", letterSpacing: "-0.02em" }}
          >
            One network. One record. One less thing to worry about.
          </h2>
          <p
            className="font-sans text-white/60 text-[14.5px] max-w-[380px]"
            style={{ lineHeight: "1.6" }}
          >
            Try Fil One for 30 days with 1 TB of storage and 2 TB of egress included, and no credit card. Or talk to our team about enterprise pricing and moving your existing storage across.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center">
          <Button variant="primary" tone="dark" href={signupUrl()} onClick={() => trackCtaClick("Start at no cost to you", signupUrl(), "primary")}>
            Start at no cost to you
          </Button>
          <Button variant="secondary" tone="dark" href="/contact-sales" className="w-full sm:w-auto justify-center" onClick={() => trackCtaClick("Talk to our team", "/contact-sales", "secondary")}>
            Talk to our team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
