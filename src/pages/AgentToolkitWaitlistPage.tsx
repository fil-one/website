import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { BackButton, SectionLabel } from "@/components/LandingPrimitives";
import { useSeo } from "@/hooks/useSeo";
import {
  FIELD_INPUT_CLASS,
  TextField,
  TextAreaField,
  SelectField,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";

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

const TOOLS = [
  "Claude",
  "Cursor",
  "Continue",
  "ChatGPT",
  "Zapier",
  "n8n",
  "Make.com",
  "Not sure yet",
  "Other",
];

const AgentToolkitWaitlistPage = () => {
  useSeo({
    title: "Join the AI Agent Toolkit Waitlist · Fil One",
    description: "Get early access to the AI Agent Toolkit. Connect your AI tools and automations to Fil One. Join the waitlist and we'll reach out when your spot is ready.",
    canonical: "https://www.fil.one/waitlist/ai-agent-toolkit",
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [timeline, setTimeline] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [otherTool, setOtherTool] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTool = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_AGENT_TOOLKIT_WAITLIST_FORM_GUID,
      pageName: "AI Agent Toolkit Waitlist",
      fields: [
        { objectTypeId: "0-1", name: "email", value: email },
        { objectTypeId: "0-1", name: "firstname", value: firstName },
        { objectTypeId: "0-1", name: "lastname", value: lastName },
        ...(timeline ? [{ objectTypeId: "0-1", name: "ai_toolkit_timeline", value: timeline }] : []),
        ...(teamSize ? [{ objectTypeId: "0-1", name: "team_size", value: teamSize }] : []),
        ...(selectedTools.length > 0 ? [{ objectTypeId: "0-1", name: "ai_tools", value: selectedTools.join(";") }] : []),
        ...(selectedTools.includes("Other") && otherTool ? [{ objectTypeId: "0-1", name: "other_tool", value: otherTool }] : []),
        ...(notes ? [{ objectTypeId: "0-1", name: "ai_toolkit_notes", value: notes }] : []),
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
            <SectionLabel>Early access · AI Agent Toolkit</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Join the waitlist
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Get early access to the AI Agent Toolkit. Connect your AI tools and automations directly to Fil One, and we'll reach out as soon as your spot is ready.
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
                <SelectField label="Timeline" value={timeline} onChange={e => setTimeline(e.target.value)}>
                  <option value="">Select…</option>
                  {TIMELINES.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
                <SelectField label="Team size" value={teamSize} onChange={e => setTeamSize(e.target.value)}>
                  <option value="">Select…</option>
                  {TEAM_SIZES.map(o => <option key={o} value={o}>{o}</option>)}
                </SelectField>
              </div>

              {/* Tool picker: multi-select grid with a conditional "Other" input */}
              <fieldset className="m-0 border-none p-0">
                <legend className="mb-1.5 p-0 font-sans font-medium text-[13.5px] text-zinc-700">
                  Which tools are you connecting?
                </legend>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {TOOLS.map(tool => {
                    const checked = selectedTools.includes(tool);
                    return (
                      <label
                        key={tool}
                        className="flex cursor-pointer items-center gap-2.5 font-sans text-[14px] text-zinc-700"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTool(tool)}
                          className="peer sr-only"
                        />
                        <span
                          className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] transition-all peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 ${
                            checked ? "border-brand-500 bg-brand-500" : "border-black/[0.18] bg-white"
                          }`}
                        >
                          {checked && <Check size={11} weight="bold" className="text-white" />}
                        </span>
                        <span>{tool}</span>
                      </label>
                    );
                  })}
                </div>
                {selectedTools.includes("Other") && (
                  <input
                    type="text"
                    value={otherTool}
                    onChange={e => setOtherTool(e.target.value)}
                    placeholder="Which tool?"
                    aria-label="Which tool?"
                    className={`${FIELD_INPUT_CLASS} mt-2`}
                  />
                )}
              </fieldset>

              <TextAreaField
                label="Notes (optional)"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="What are you building with Fil One?"
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

export default AgentToolkitWaitlistPage;
