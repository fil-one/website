import { useInView } from "@/hooks/useInView";

const IntroSection = () => {
  const { ref, inView } = useInView();

  return (
    <section
      className="flex flex-col items-center justify-center px-5 md:px-8 pt-24 md:pt-32 pb-12 md:pb-16 w-full"
    >
      <div ref={ref} className={`flex flex-col gap-6 items-center text-center w-full max-w-[640px] reveal${inView ? " in-view" : ""}`}>
        <h2
          className="text-2xl sm:text-[28px] md:text-[32px]"
          style={{
            fontFamily: "'Aspekta', sans-serif",
            fontWeight: 500,
            lineHeight: "1.2",
            letterSpacing: "-0.02em",
            color: "#09090B",
          }}
        >
          A new standard for provable resilience
        </h2>
        <p
          className="text-[15px] md:text-base"
          style={{
            fontFamily: "'Funnel Sans', sans-serif",
            fontWeight: 400,
            lineHeight: "1.65",
            color: "#71717A",
            maxWidth: 560,
          }}
        >
          Everything you expect from the cloud, plus three things it was never designed to support:{" "}
          <span style={{ color: "#0070CC", fontWeight: 600 }}>verifying integrity</span>{" "}
          (independently and continuously),{" "}
          <span style={{ color: "#0070CC", fontWeight: 600 }}>keeping a tamper-proof record</span>{" "}
          of everything that's ever happened to your data, and{" "}
          <span style={{ color: "#0070CC", fontWeight: 600 }}>letting you move it anywhere</span>{" "}
          without getting locked in.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
