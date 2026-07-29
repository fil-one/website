import { useState } from "react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { BackButton, SectionLabel } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import {
  TextField,
  TextAreaField,
  SelectField,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_BUCKET_INTELLIGENCE_WAITLIST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";

const USE_CASES = [
  "Document Q&A",
  "Internal knowledge base",
  "Customer support",
  "Research assistant",
  "Other",
];

const RAG_SOLUTIONS = [
  "LangChain",
  "LlamaIndex",
  "OpenAI (native)",
  "Pinecone",
  "Building from scratch",
  "Not using RAG yet",
  "Other",
];

const TIMELINES = [
  "Actively building now",
  "Planning in next 3 months",
  "Evaluating in next 6 months",
  "Just exploring",
];

const TEAM_SIZES = [
  "Just me",
  "2-10 people",
  "11-50 people",
  "51+ people",
];

const STORAGE_AMOUNTS = [
  "Less than 25 TB",
  "25 - 50 TB",
  "50 - 100 TB",
  "100 - 150 TB",
  "150 - 250 TB",
  "250 - 500 TB",
  "500 - 1 PB",
  "More than 1 PB",
];

const BucketIntelligenceWaitlistPage = () => {
  useSeo({
    title: "Join the Bucket Intelligence Waitlist · Fil One",
    description: "Get early access to Bucket Intelligence. Turn any bucket into a queryable knowledge base. Join the waitlist and we'll reach out when your spot is ready.",
    canonical: "https://www.fil.one/waitlist/bucket-intelligence",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [useCase, setUseCase] = useState("");
  const [ragSolution, setRagSolution] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [storageAmount, setStorageAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_BUCKET_INTELLIGENCE_WAITLIST_FORM_GUID,
      pageName: "Bucket Intelligence Waitlist",
      fields: [
        { objectTypeId: "0-1", name: "email", value: email },
        { objectTypeId: "0-1", name: "firstname", value: firstName },
        { objectTypeId: "0-1", name: "lastname", value: lastName },
        ...(useCase       ? [{ objectTypeId: "0-1", name: "primary_use_case",   value: useCase       }] : []),
        ...(ragSolution   ? [{ objectTypeId: "0-1", name: "how_are_you_handling_rag_today", value: ragSolution }] : []),
        ...(timeline      ? [{ objectTypeId: "0-1", name: "timeline",           value: timeline      }] : []),
        ...(teamSize      ? [{ objectTypeId: "0-1", name: "team_size",          value: teamSize      }] : []),
        ...(storageAmount ? [{ objectTypeId: "0-1", name: "amount_of_storage_rag", value: storageAmount }] : []),
        ...(notes         ? [{ objectTypeId: "0-1", name: "message",            value: notes         }] : []),
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "By joining the waitlist, you consent to allow Fil One to store and process your information and send you product updates.",
          communications: [{
            value: true,
            subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
            text: "I agree to receive product updates from Fil One.",
          }],
        },
      },
    });

    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          <BackButton />

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Early access · Bucket Intelligence</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Join the waitlist
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Get early access to Bucket Intelligence. Turn any bucket into a queryable knowledge base, and we'll reach out as soon as your spot is ready.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess title="You're on the list!">
              We'll reach out as soon as your spot is ready. Keep an eye on your inbox.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-4">
                <TextField label="First name" required type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Jane" />
                <TextField label="Last name" required type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Smith" />
              </div>

              <TextField label="Work email" required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" />

              <div className="grid grid-cols-2 gap-4">
                <SelectField label="Primary use case" value={useCase} onChange={e => setUseCase(e.target.value)}>
                  <option value="">Select…</option>
                  {USE_CASES.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
                <SelectField label="How are you handling RAG today?" value={ragSolution} onChange={e => setRagSolution(e.target.value)}>
                  <option value="">Select…</option>
                  {RAG_SOLUTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
                <SelectField label="Timeline" value={timeline} onChange={e => setTimeline(e.target.value)}>
                  <option value="">Select…</option>
                  {TIMELINES.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
                <SelectField label="Team size" value={teamSize} onChange={e => setTeamSize(e.target.value)}>
                  <option value="">Select…</option>
                  {TEAM_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
              </div>

              <SelectField label="Amount of storage" value={storageAmount} onChange={e => setStorageAmount(e.target.value)}>
                <option value="">Select…</option>
                {STORAGE_AMOUNTS.map(o => <option key={o} value={o}>{o}</option>)}
              </SelectField>

              <TextAreaField
                label="Notes (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="What file types do you work with? How large is your document corpus?"
              />

              <div className="h-px w-full bg-black/[0.07]" />

              <p className="font-sans font-normal text-[12.5px] leading-[1.7] text-zinc-500">
                By submitting this form you consent to allow Fil One to store and process your information and send you product updates. You can unsubscribe at any time. See our{" "}
                <a href="/privacy" className="text-zinc-500 underline">Privacy Policy</a>.
              </p>

              <div className="flex flex-col gap-2">
                <SubmitButton loading={loading} disabled={!email}>
                  {loading ? "Joining…" : "Join waitlist"}
                </SubmitButton>
                {error && <FormError>{error}</FormError>}
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BucketIntelligenceWaitlistPage;
