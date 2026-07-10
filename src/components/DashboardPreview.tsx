import imgDashboard from "../assets/dashboard-preview.png";

/**
 * The product-screenshot showcase that sits directly below the hero.
 * Own `overflow-hidden` wrapper replicates the clipping the hero <section>
 * used to provide for the frame's negative clip-path and fade gradients.
 */
const DashboardPreview = () => (
  <div className="relative w-full overflow-hidden">
    <div className="relative px-5 sm:px-10 md:px-16 lg:px-[120px] pb-0 pt-12 md:pt-16 max-w-[1120px] mx-auto w-full hero-fade-4">
      <div
        className="relative w-full rounded-t-[12px] md:rounded-t-[16px] overflow-hidden"
        style={{
          background: "linear-gradient(#fff, #fff) padding-box, linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.10) 80%, rgba(0,0,0,0) 100%) border-box",
          border: "1px solid transparent",
          borderBottom: "none",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.06)",
          clipPath: "inset(-40px -40px 0 -40px)",
        }}
      >
        <img
          src={imgDashboard}
          alt="Fil One platform — object storage, RAG pipeline, and AI agent toolkit"
          className="w-full h-auto block"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0) 40%, #FFFFFF 75%)",
          }}
        />
      </div>
      <div
        className="absolute bottom-0 pointer-events-none"
        style={{
          top: "55%",
          left: "-80px",
          right: "-80px",
          background: "linear-gradient(to bottom, transparent, #FFFFFF 65%)",
        }}
      />
    </div>
  </div>
);

export default DashboardPreview;
