import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";

const pStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14.5,
  lineHeight: "1.7",
  color: "#52525B",
};

const liStyle = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 400,
  fontSize: 14.5,
  lineHeight: "1.7",
  color: "#52525B",
};

const h2Style = {
  fontFamily: "'Funnel Sans', sans-serif" as const,
  fontWeight: 600,
  fontSize: 15,
  color: "#09090B",
  letterSpacing: "-0.01em",
};

const AcceptableUsePolicy = () => {
  useSeo({
    title: "Acceptable Use Policy — Fil One",
    description: "Read the Fil One Acceptable Use Policy governing the use of our S3-compatible object storage services.",
    canonical: "https://filone.io/aup",
  });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <Navbar />

      <main className="flex flex-col items-center px-5 md:px-8 pt-28 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[720px]">

          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1
              className="text-[28px] md:text-[36px]"
              style={{
                fontFamily: "'Aspekta', sans-serif",
                fontWeight: 500,
                lineHeight: "1.15",
                letterSpacing: "-0.02em",
                color: "#09090B",
              }}
            >
              Acceptable Use Policy
            </h1>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
              Effective Date: Mar 30, 2026
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {/* Intro */}
          <p style={pStyle}>
            This Acceptable Use Policy (&ldquo;AUP&rdquo;) governs the use of all FIL One LLC (&ldquo;FIL One&rdquo;) cloud storage services, APIs, and related infrastructure (the &ldquo;Services&rdquo;). It applies to all customers, authorized users, and any end users acting on their behalf. This AUP is part of the FIL One Service Terms and is incorporated by reference. We may revise this AUP from time to time and will give thirty (30) days&rsquo; notice before any material changes take effect. You are responsible for the compliance of your own customers or end users with the terms of this AUP. FIL One&rsquo;s products and services (collectively &ldquo;Services&rdquo;) may be used only for lawful purposes. Transmission, distribution or storage of any content in violation of any applicable law or regulation is prohibited as further stated below.
          </p>

          {/* 1. Prohibited Content */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>1. Prohibited Content</h2>
            <p style={pStyle}>
              The following content may not be stored, uploaded, transmitted, or made available through the Services under any circumstances:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Content that violates any applicable law or regulation, wherever you or your users are located;</li>
              <li style={liStyle}>Child sexual abuse material (CSAM) or any content that sexually exploits minors. Any discovery will result in immediate account termination and referral to NCMEC and relevant law enforcement;</li>
              <li style={liStyle}>Content that infringes a third party&rsquo;s copyright, trademark, patent, trade secret, or other intellectual property right;</li>
              <li style={liStyle}>Malware, ransomware, spyware, exploit code, phishing kits, or anything else built to damage, surveil, or gain unauthorized access to systems;</li>
              <li style={liStyle}>Content designed to harass, threaten, or incite violence or hatred toward individuals or groups based on protected characteristics; or</li>
              <li style={liStyle}>Spam, fraudulent communications, or content intended to deceive recipients.</li>
            </ul>
          </div>

          {/* 2. Prohibited Activities */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>2. Prohibited Activities</h2>
            <p style={pStyle}>
              You may not use the Services &mdash; or help others use them &mdash; to:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Access systems, networks, or data without authorization, whether through hacking, credential stuffing, vulnerability exploitation, or any other means;</li>
              <li style={liStyle}>Launch or assist denial-of-service attacks (DoS/DDoS), conduct port scanning, or interfere with the availability of any system or network;</li>
              <li style={liStyle}>Bypass or disable security controls, rate limits, or authentication mechanisms on the Services or any third-party system;</li>
              <li style={liStyle}>Resell or sublicense access to the Services without our written approval;</li>
              <li style={liStyle}>Run cryptocurrency mining operations or blockchain validation as a primary workload;</li>
              <li style={liStyle}>Register fraudulent accounts, use stolen payment methods, or otherwise avoid paying for what you use; or</li>
              <li style={liStyle}>Distribute weapons-of-mass-destruction instructions or material that supports terrorism or attacks on critical infrastructure.</li>
            </ul>
          </div>

          {/* 3. AI and Machine Learning Workloads */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>3. AI and Machine Learning Workloads</h2>
            <p style={pStyle}>
              We actively support AI and ML use cases. That said, a few things are not acceptable regardless of the application:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Training datasets made up of data scraped or collected without proper user consent or in breach of applicable privacy law;</li>
              <li style={liStyle}>Model weights, outputs, or artifacts built to generate illegal content &mdash; including CSAM, targeted harassment material, or weapons instructions; and</li>
              <li style={liStyle}>Synthetic datasets intended to train models for non-consensual deepfakes, fraud-enabling voice cloning, or similar harmful purposes.</li>
            </ul>
          </div>

          {/* 4. Regulated and Sensitive Data */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>4. Regulated and Sensitive Data</h2>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>HIPAA.</strong> You need a signed Business Associate Agreement (BAA) with FIL One before storing any Protected Health Information (PHI). There are no exceptions. Reach out to <a href="mailto:compliance@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>compliance@fil.one</a> to get that process started.
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>PCI DSS.</strong> If payment cardholder data passes through or lives in your environment, PCI DSS compliance is your responsibility. FIL One does not certify any particular configuration as compliant.
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>Government-Classified Information.</strong> FIL One&rsquo;s infrastructure is not accredited for classified government data at any level. Do not store it here.
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>Children&rsquo;s Data.</strong> Applications that collect or handle personal data from children under 13 &mdash; or a higher age where local law requires &mdash; must comply with COPPA, GDPR Article 8, and any other applicable children&rsquo;s privacy rules. That obligation sits with you.
            </p>
          </div>

          {/* 5. Export Controls and Sanctions */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>5. Export Controls and Sanctions</h2>
            <p style={pStyle}>
              Do not use the Services to store, move, or share technology, software, or data in ways that would violate U.S. export control or sanctions law &mdash; including the Export Administration Regulations (EAR), the International Traffic in Arms Regulations (ITAR), and OFAC programs. By using the Services, you confirm that you are not based in, nor a national of, any country under comprehensive U.S. sanctions, and that your name does not appear on any U.S. government restricted-party list.
            </p>
          </div>

          {/* 6. Copyright and DMCA */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>6. Copyright and DMCA</h2>
            <p style={pStyle}>
              Storing or distributing content that infringes someone else&rsquo;s copyright is not permitted. FIL One responds to valid takedown notices under the Digital Millennium Copyright Act (17 U.S.C. &sect; 512).
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>Submitting a takedown notice:</strong> Email <a href="mailto:legal@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>legal@fil.one</a> with the subject line &ldquo;DMCA Notice.&rdquo; Your notice needs to include: (a) the copyrighted work at issue; (b) enough information to locate the infringing material; (c) your contact details; (d) a statement that you believe in good faith the use is unauthorized; and (e) a declaration, under penalty of perjury, that your information is accurate and you have authority to act.
            </p>
            <p style={pStyle}>
              <strong style={{ fontWeight: 600, color: "#09090B" }}>Disputing a takedown (counter-notice):</strong> If you believe your content was removed in error, send a counter-notice to <a href="mailto:legal@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>legal@fil.one</a> including: (a) identification of what was taken down; (b) a statement under penalty of perjury that the removal was a mistake; and (c) your contact details and agreement to the jurisdiction of the relevant federal court.
            </p>
            <p style={pStyle}>
              Accounts that rack up multiple valid takedown notices are subject to suspension or permanent termination under our repeat infringer policy.
            </p>
          </div>

          {/* 7. Enforcement */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>7. Enforcement</h2>
            <p style={pStyle}>
              We look into suspected violations when they come to our attention and may take any of the following steps depending on what we find:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Send a warning and ask you to fix the problem;</li>
              <li style={liStyle}>Throttle, restrict, or remove access to specific objects, buckets, or your account as a whole;</li>
              <li style={liStyle}>Suspend or close the account &mdash; with or without prior notice depending on the situation; or</li>
              <li style={liStyle}>Pass information about suspected illegal activity to law enforcement or the relevant regulatory body.</li>
            </ul>
            <p style={pStyle}>
              We will generally give you notice and a chance to sort things out before taking serious action. That said, we will act immediately &mdash; without prior notice &mdash; if something poses a live security threat, involves content that is illegal on its face, or if a government authority requires it. We do not guarantee that we will catch every violation, and nothing here creates an obligation on our part to actively monitor stored content.
            </p>
          </div>

          {/* Contacts */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Contacts</h2>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Abuse / violations: <a href="mailto:legal@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>legal@fil.one</a></li>
              <li style={liStyle}>DMCA notices: <a href="mailto:legal@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>legal@fil.one</a> &mdash; Subject: &ldquo;DMCA Notice&rdquo;</li>
              <li style={liStyle}>Security disclosures: <a href="mailto:security@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>security@fil.one</a></li>
              <li style={liStyle}>HIPAA BAA / compliance: <a href="mailto:legal@fil.one" style={{ color: "#09090B", textDecoration: "underline" }}>legal@fil.one</a></li>
            </ul>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AcceptableUsePolicy;
