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

const PrivacyPolicy = () => {
  useSeo({
    title: "Privacy Policy — Fil One",
    description: "Learn how Fil One collects, uses, and protects your data on our S3-compatible object storage platform.",
    canonical: "https://filone.io/privacy",
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
              Privacy Policy
            </h1>
            <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#71717A" }}>
              Effective Date: Mar 3, 2026
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {/* Intro */}
          <p style={pStyle}>
            FIL One (collectively, &ldquo;Fil One,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) provides this Privacy Policy to explain our practices regarding the collection, use, and disclosure of your personal information both online and offline. This Privacy Policy applies to our website and any websites, apps, or services that link to this Privacy Policy (&ldquo;Services&rdquo;), unless otherwise indicated.
          </p>

          {/* I */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>I. What Personal Information is Collected</h2>
            <p style={pStyle}>
              Depending on how you interact with us, we may collect the following categories of personal information, some of which may be considered sensitive personal information under applicable laws, when you use our Services:
            </p>
            <ul className="flex flex-col gap-3 pl-5 list-disc">
              <li style={liStyle}>
                <strong>Information you provide directly to us.</strong> We may collect and store any personal information you enter on our Services or provide to us in some other manner, including personal information that may be contained in any video, comment, or other submission you upload or post to the Websites. This personal information includes:
                <ul className="flex flex-col gap-2 pl-5 list-disc mt-2">
                  <li style={liStyle}>Identifiers, including your real name, postal address, e-mail address, telephone number, and other similar identifiers;</li>
                  <li style={liStyle}>Commercial information, including information you provide if you transact business with us or receive funding from us, such as contracted-for services, records of personal property, and financial information such as your payment method (e.g., valid credit card number, bank account information, or other financial information);</li>
                  <li style={liStyle}>Geolocation data, including information derived from IP address and other device information;</li>
                  <li style={liStyle}>Demographic and profile information, including your interests, preferences, activities, gender, age, racial or ethnic origin, and other demographic information;</li>
                  <li style={liStyle}>Audio, electronic, or visual information, including video, comments, or submissions uploaded to the Websites or Services; and</li>
                  <li style={liStyle}>Inferences, which may be drawn from any of the categories of personal information described above.</li>
                </ul>
              </li>
              <li style={liStyle}>
                <strong>Information we may collect automatically.</strong> We may collect internet, electronic activity, and other information from the devices and browsers that you use, including your device type; IP address; device and advertising identifiers, probabilistic identifiers, and other unique personal or online identifiers; time zone setting and location; browser type and version; browser plug-in types and versions; operating system and platform; Internet service provider; pages that you visit before and after using the Services, browsing history, and search history; the date and time of your visit; information about the links you click, pages you view, and advertising you interact with within the Services and other information about how you use the Services, and the technology on the devices you use to access these Services. If you or your device experiences an error, we collect information about the error, the time the error occurred, the feature being used, the state of the application when the error occurred, and any communications or content provided at the time the error occurred.
              </li>
            </ul>
            <p style={pStyle}>
              We may aggregate or de-identify the personal information described above. Aggregated or de-identified data that we do not attempt to reidentify is not subject to this Privacy Policy.
            </p>
            <p style={pStyle}>
              Without this personal information, we are not able to provide you with all of the requested Services.
            </p>
          </div>

          {/* II */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>II. Sources of Personal Information</h2>
            <p style={pStyle}>
              In addition to receiving personal information from you, we may also periodically obtain the categories of personal information described above from other sources, including from users of our Services, operating systems and platforms, social networks, government entities that make personal information publicly available, service providers, project partners and collaborators, business partners, contractors, volunteers, and other third parties.
            </p>
          </div>

          {/* III */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>III. How We Use Personal Information</h2>
            <p style={pStyle}>We may use your personal information for the following business purposes:</p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}>To provide you with access to and use of Services, including to facilitate use of our Websites, manage your account and preferences, process or fulfill orders and transactions, process payments, and provide customer service;</li>
              <li style={liStyle}>To market and advertise the Services, including emails about events and opportunities you may be interested in;</li>
              <li style={liStyle}>To evaluate and administer funding and related applications, including to review application materials and provide funding for selected proposals;</li>
              <li style={liStyle}>To help keep the Services effective and secure, including to debug to identify and repair errors that impair existing functionality;</li>
              <li style={liStyle}>To enforce our Terms of Service;</li>
              <li style={liStyle}>To identify and protect against fraudulent transactions and other misuses of our Services;</li>
              <li style={liStyle}>To analyze use of and improve our Websites and Services;</li>
              <li style={liStyle}>To contact you;</li>
              <li style={liStyle}>To comply with applicable laws and regulatory obligations; and</li>
              <li style={liStyle}>For any other purpose disclosed to you at the time we collect your personal information with your consent.</li>
            </ul>
            <p style={pStyle}>We do not use or disclose sensitive personal information beyond those purposes described above.</p>
            <p style={pStyle}>
              If you post personal information about yourself or others, or communicate with others using our Services, please note that we cannot control who reads your postings or what they do with the personal information you provide. We encourage you to use caution in posting personal information.
            </p>
          </div>

          {/* IV */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>IV. Disclosure of Personal Information</h2>
            <p style={pStyle}>We may disclose your personal information in the following circumstances:</p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}><strong>Affiliates &amp; Related Entities:</strong> We may disclose your personal information between and among affiliates, subsidiaries, and related companies.</li>
              <li style={liStyle}><strong>Working Group Participants:</strong> We may disclose personal information, such as identifiers like real name and email, with members of working groups that we participate in.</li>
              <li style={liStyle}><strong>Funding Programs:</strong> We may disclose personal information, such as identifiers, financial information, and demographic information with entities with whom we co-administer grants or other funding programs, in order to evaluate funding applications and administer funding, including to review materials submitted and to provide the appropriate financing for selected proposals.</li>
              <li style={liStyle}><strong>Service Providers &amp; Business Partners:</strong> We may disclose your personal information, including identifiers, commercial information, electronic and network activity, geolocation data, demographic information, and inferences to support a variety of business purposes. These business purposes include product and service delivery, customer service, marketing, analytics services, security and performance monitoring, maintaining and servicing accounts, processing or fulfilling orders and transactions, verifying customer information, research, data hosting, auditing, and data processing.</li>
              <li style={liStyle}><strong>Business transactions:</strong> If we become involved with a merger, reorganization, corporate transaction, or another situation involving the transfer of some or all of our business assets, we may disclose your personal information with business entities or people involved in the negotiation or transfer.</li>
              <li style={liStyle}><strong>As Required by Law:</strong> We may also collect, use, and disclose your personal information as necessary to comply with the law, respond to subpoenas, court orders, or other legal process, law enforcement requests, legal claims or government inquiries, detect fraud, and to protect and defend the rights, interests, safety and security of our Websites, Services, users, a third-party, or the public.</li>
              <li style={liStyle}><strong>With your consent:</strong> We may also disclose personal information about you with other entities if you give us permission.</li>
            </ul>
            <p style={pStyle}>
              Please note that if you post any of your personal information via the Services, such personal information may be viewed, collected, and used by others over whom we have no control. We are not responsible for the use by third parties of personal information you post or otherwise make public.
            </p>
            <p style={pStyle}>
              We do not sell personal information to third parties for monetary or other valuable consideration as defined by applicable law or share personal information for purposes of cross-contextual behavioral or targeted advertising.
            </p>
          </div>

          {/* V */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>V. Cookies</h2>
            <p style={pStyle}>
              &ldquo;Cookies&rdquo; are small text files that allow websites to store and retrieve information about you from your computer system. We may serve cookies to track individual site usage for later aggregation. If you do not want information collected through the use of cookies, there is a procedure in most browser settings that allows you to automatically decline cookies, or be given the choice of declining or accepting the transfer to your computer of a particular cookie (or cookies) from a particular site. You may wish to refer to allaboutcookies.org/manage-cookies. If you reject cookies through your browser settings, you may still use our Services, but you may experience some inconvenience.
            </p>
          </div>

          {/* VI */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>VI. Your Rights</h2>
            <p style={pStyle}>Depending on where you reside, you may be entitled to request access to, portability, correction, and deletion of your personal information.</p>
            <ul className="flex flex-col gap-2 pl-5 list-disc">
              <li style={liStyle}><strong>Right to Know:</strong> You may have the right to know what personal information we have collected about you, including the categories of personal information, the categories of sources from which it is collected, the business or commercial purposes for collecting, selling, or sharing it, and the categories of third parties to whom we disclose it.</li>
              <li style={liStyle}><strong>Right to Access &amp; Data Portability:</strong> Subject to certain exceptions, you may have the right to request a copy of the personal information we collected about you.</li>
              <li style={liStyle}><strong>Right to Correction and Deletion:</strong> You may have the right to request that we correct or delete personal information that we collected from you and retain, subject to certain exceptions.</li>
            </ul>
            <p style={pStyle}>
              To exercise your access, portability, correction, and deletion rights, you may submit a request by e-mail at Support Email. Once we receive your request, we may verify it by requesting information sufficient to confirm your identity. You may also be entitled, in accordance with applicable law, to appeal a refusal to take action on your request; to do so please respond to the email denying your request.
            </p>
            <p style={pStyle}>
              Only you, or a person authorized by you to act on your behalf, may make a verifiable consumer request related to your personal information. If you would like to use an authorized agent to exercise your rights, we may request evidence that you have provided such agent with power of attorney or that the agent otherwise has valid written authority to submit requests to exercise rights on your behalf. We reserve the right to deny requests in certain circumstances, such as where we have a reasonable belief that the request is fraudulent, where your identity cannot be confirmed, or where we must maintain your personal information consistent with applicable law.
            </p>
            <p style={pStyle}>
              Note that while some of the personal information that we collect about you may be considered sensitive personal information, we process such information for only those purposes detailed in this Privacy Policy and as authorized by law.
            </p>
          </div>

          {/* VII */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>VII. Other California Rights</h2>
            <p style={pStyle}>
              <strong>Do Not Track:</strong> Our systems do not at this time have the necessary programming to honor &ldquo;Do Not Track&rdquo; or &ldquo;DNT&rdquo; browser signals. Please return to this Privacy Policy in future for further updates on this topic.
            </p>
            <p style={pStyle}>
              <strong>Shine the Light:</strong> California residents who provide certain personal information in connection with obtaining products or services for personal, family, or household use are entitled to request and obtain from us once a calendar year information about the customer information we disclosed, if any, with other businesses for their own direct marketing uses. If applicable, this information would include the categories of customer information and the names and addresses of those businesses with which we disclosed customer information for the immediately prior calendar year.
            </p>
          </div>

          {/* VIII */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>VIII. Communication from Us</h2>
            <p style={pStyle}>
              From time to time, we may send you information with announcements and updates about the Websites and the Services. You may elect to opt-out of ongoing e-mail communication from us, such as newsletters, subscriptions, and inquiries.
            </p>
          </div>

          {/* IX */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>IX. Children</h2>
            <p style={pStyle}>
              The Websites and Services are not intended for children under the age of 16 nor do we knowingly collect personal information from children under 16. We do not knowingly sell or share personal information of individuals under the age of 16.
            </p>
          </div>

          {/* X */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>X. Links to Other Sites</h2>
            <p style={pStyle}>
              The Services may provide links and pointers to websites maintained by other organizations. We provide these links as a convenience to users, but we do not operate, control, or endorse such sites. We also disclaim any responsibility for the information on those sites and any products or services offered there, and cannot vouch for the privacy policies of such sites. We do not make any warranties or representations that any linked websites will function without error or interruption, or that defects will be corrected.
            </p>
          </div>

          {/* XI */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>XI. E-Commerce</h2>
            <p style={pStyle}>
              We may have links to outside websites where you may engage in transactions. We are not responsible for transactions conducted on those sites and cannot vouch for the security of the personal information submitted in those transactions. We have no control over the content and security practices of outside websites.
            </p>
          </div>

          {/* XII */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>XII. Security and Retention</h2>
            <p style={pStyle}>
              Personal information will be retained only for so long as reasonably necessary and proportionate for the purposes set out above in accordance with applicable law and based on the criteria set out in this Privacy Policy. We have in place commercially reasonable technological and procedural security measures in an attempt to protect and safeguard the security of the personal information. Despite these efforts, please understand that no system is perfect or can guarantee that unauthorized access or theft of data might not occur.
            </p>
          </div>

          {/* XIII */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>XIII. Changes to This Privacy Policy</h2>
            <p style={pStyle}>
              We may amend this Privacy Policy at any time, so please review it frequently. If we make a material change to this Privacy Policy, we will update the Last Updated date on this notice.
            </p>
          </div>

          {/* XIV */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>XIV. Policy Acceptance</h2>
            <p style={pStyle}>
              By using the Services, you signify your acknowledgment of this Privacy Policy. If you do not agree or are not comfortable with any policy described in this Privacy Policy, you may discontinue use of the Services.
            </p>
          </div>

          {/* XV */}
          <div className="flex flex-col gap-3">
            <h2 style={h2Style}>XV. More Questions?</h2>
            <p style={pStyle}>
              If you have any questions about this Privacy Policy, email them to Support Email and be sure to indicate the specific site you&rsquo;re visiting and the nature of your question or concern.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
