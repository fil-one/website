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

const TermsOfUse = () => {
  useSeo({
    title: "Terms of Use — Fil One",
    description: "Read the Fil One terms of use governing access to our S3-compatible object storage platform.",
    canonical: "https://filone.io/terms",
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
              Terms of Use
            </h1>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
              Effective Date: Mar 3, 2026
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {/* Intro */}
          <p style={pStyle}>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your use of FIL One LLC, website and any other website that FIL One operates and that links to these Terms (collectively, the &ldquo;Website&rdquo;).
          </p>
          <p style={pStyle}>
            Please review these Terms carefully before using the Website. We may change these Terms or modify any features of the Website at any time. The most current version of the Terms can be viewed by clicking on the &ldquo;Terms of Use&rdquo; link posted through the Website. You accept the Terms by using the Website, and you accept any changes to the Terms by continuing to use the Website after we post the changes.
          </p>

          {/* Privacy */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Privacy</h2>
            <p style={pStyle}>
              By using the Website, you consent to our processing of your information consistent with our Privacy Policy.
            </p>
          </div>

          {/* Prohibited Conduct */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Prohibited Conduct</h2>
            <p style={pStyle}>
              You may not access or use, or attempt to access or use, the Website to take any action that could harm us or any third party, interfere with the operation of the Website, or use the Website in a manner that violates any laws. For example, and without limitation, you may not:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Engage in unauthorized spidering, &ldquo;scraping,&rdquo; or harvesting of content or personal information, or use any other unauthorized automated means to compile information.</li>
              <li style={liStyle}>Take any action that imposes an unreasonable or disproportionately large load on our network or infrastructure.</li>
              <li style={liStyle}>Use any device, software, or routine to interfere or attempt to interfere with the proper working of the Website or any activity conducted on the Website.</li>
              <li style={liStyle}>Attempt to probe, scan, test the vulnerability of, or breach the security of any system or network.</li>
              <li style={liStyle}>Attempt to decipher, decompile, disassemble, or reverse-engineer any of the software comprising or in any way making up a part of the Website.</li>
              <li style={liStyle}>Engage in any other conduct that restricts or inhibits any person from using or enjoying the Website, or that, in our sole judgment, exposes us or any of our users, affiliates, or any other third party to any liability, damages, or detriment of any type.</li>
            </ul>
            <p style={pStyle}>
              Violations of system or network security may result in civil or criminal liability. We may investigate and work with law enforcement authorities to prosecute users who violate these Terms. We may suspend or terminate your access to the Website for any or no reason at any time without notice.
            </p>
          </div>

          {/* Intellectual Property */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Intellectual Property</h2>
            <p style={pStyle}>
              The Website is owned and operated by FIL One. You acknowledge and agree that, as between the parties, we own all right, title, and interest in and to the Website, including:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>All information, data, software, text, displays, and visual interfaces, graphics, images, video, and audio, and all other elements of the Website, and the design, selection, and arrangement thereof.</li>
              <li style={liStyle}>All intellectual property and other legal rights (including, but not limited to, any and all copyrights, patents, patent applications, trade secrets, trademarks, and other intangible rights) therein.</li>
            </ul>
            <p style={pStyle}>
              You may not publish, reproduce, distribute, display, perform, edit, adapt, modify, or otherwise exploit any part of the Website without our written consent. You will not earn or acquire any ownership rights in any copyrights, patents, trade secrets, trademarks, or other intellectual property rights on account of these Terms or any access to or use of the Website.
            </p>
          </div>

          {/* Links to Third-Party Content */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Links to Third-Party Content</h2>
            <p style={pStyle}>
              The Website may contain links to third-party content. We do not control, endorse, sponsor, recommend, or otherwise accept responsibility for such content. Use of any linked third-party content is at your own risk.
            </p>
          </div>

          {/* Communications with You */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Communications with You</h2>
            <p style={pStyle}>
              If you provide your email address or other contact information to us, we may communicate with you about the Website and our products and services, including through one or more third party e-mail or survey services, via the contact information you provide to us through the Website. You consent to receive communications from us that may:
            </p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>Solicit feedback via e-mail, surveys, bug reports, or other methods we may determine.</li>
              <li style={liStyle}>Collect additional information regarding issues you report in your feedback.</li>
              <li style={liStyle}>Notify you of changes to the Website, our products, or services, or these Terms.</li>
              <li style={liStyle}>Tell you about our programs, products, or services.</li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Disclaimer of Warranties; Limitation of Liability</h2>
            <p style={pStyle}>
              YOUR USE OF THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR OTHER VIOLATION OF RIGHTS. WE DO NOT WARRANT THE ADEQUACY, CURRENCY, ACCURACY, LIKELY RESULTS, OR COMPLETENESS OF THE WEBSITE OR ANY THIRD-PARTY SITES LINKED TO OR FROM THE WEBSITE, OR THAT THE FUNCTIONS PROVIDED WILL BE UNINTERRUPTED, VIRUS, OR ERROR-FREE. WE EXPRESSLY DISCLAIM ANY LIABILITY FOR ANY ERRORS OR OMISSIONS IN THE CONTENT INCLUDED IN THE WEBSITE OR ANY THIRD-PARTY SITES LINKED TO OR FROM THE WEBSITE. SOME JURISDICTIONS MAY NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU.
            </p>
            <p style={pStyle}>
              IN NO EVENT WILL WE, OR OUR AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR ASSIGNS BE LIABLE FOR ANY DIRECT OR INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, LOST PROFITS, OR OTHER DAMAGES WHATSOEVER ARISING IN CONNECTION WITH THE USE OF THE WEBSITE, ANY INTERRUPTION IN AVAILABILITY OF THE WEBSITE, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS, LOSS OF DATA, OR USE, MISUSE, RELIANCE, REVIEW, MANIPULATION, OR OTHER UTILIZATION IN ANY MANNER WHATSOEVER OF THE WEBSITE OR THE DATA COLLECTED THROUGH THE WEBSITE, EVEN IF ONE OR MORE OF THEM HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR LOSS. ANY CLAIM ARISING OUT OF OR CONNECTED WITH THE WEBSITE WILL BE LIMITED TO THE GREATER OF $100 OR THE AMOUNT THAT YOU PAID TO ACCESS THE WEBSITE.
            </p>
          </div>

          {/* Indemnification */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Indemnification</h2>
            <p style={pStyle}>
              YOU AGREE TO INDEMNIFY, DEFEND AND HOLD US AND OUR AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND ASSIGNS HARMLESS FROM AND AGAINST ANY AND ALL LOSSES, COSTS, EXPENSES (INCLUDING REASONABLE ATTORNEYS&rsquo; FEES AND EXPENSES), CLAIMS, DAMAGES, AND LIABILITIES RELATED TO OR ASSOCIATED WITH YOUR USE OF THE WEBSITE AND ANY ALLEGED VIOLATION BY YOU OF THESE TERMS. WE RESERVE THE RIGHT TO ASSUME THE EXCLUSIVE DEFENSE OF ANY CLAIM FOR WHICH WE ARE ENTITLED TO INDEMNIFICATION UNDER THIS SECTION. IN SUCH EVENT, YOU SHALL PROVIDE US WITH SUCH COOPERATION AS WE REASONABLY REQUEST.
            </p>
          </div>

          {/* Choice of Law */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Choice of Law and Forum</h2>
            <p style={pStyle}>
              You agree that your access to and use of the Website will be governed by and will be construed in accordance with the law of the State of California without regard to principles of conflicts of laws. You agree that any claim or dispute against us arising out of or relating to the Website must be resolved by a federal district court located in California, unless agreed upon by all parties.
            </p>
          </div>

          {/* Miscellaneous */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>Miscellaneous</h2>
            <p style={pStyle}>
              These Terms constitute the entire agreement between you and us, superseding any prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and us, regarding the subject matter hereof. In the event that any provision of these Terms is held unenforceable, it will not affect the validity or enforceability of the remaining provisions and will be replaced by an enforceable provision that comes closest to the intention underlying the unenforceable provision. You agree that no joint venture, partnership, employment, or agency relationship exists between you and us as a result of these Terms or your access to and use of the Website. Our failure to enforce any provisions of these Terms or respond to a violation by any party does not waive our right to subsequently enforce any terms or conditions of the Terms or respond to any violations. Nothing contained in these Terms is in derogation of our right to comply with governmental, court, and law enforcement requests or requirements relating to your use of the Website or information provided to or gathered by us with respect to such use.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfUse;
