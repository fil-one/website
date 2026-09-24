import { useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel } from "@/components/LandingPrimitives";
import {
  TextField,
  TextAreaField,
  SelectField,
  Checkbox,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_NEOCLOUD_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";
import { validateFields, hasErrors, focusFirstInvalid, type FieldErrors } from "@/lib/formValidation";

/*
 * HubSpot form fields this page submits (create the form with these internal
 * names; the neocloud-specific ones are company properties, object 0-2):
 *   contact 0-1: firstname, lastname, email, jobtitle
 *   company 0-2: name, gpu_locations, gpu_fleet_size, start_timeline,
 *                tell_us_about_your_business
 */

const FLEET_SIZES = ["Under 500 GPUs", "500 to 5,000 GPUs", "Over 5,000 GPUs"];
const TIMELINES = ["Now", "This quarter", "Just exploring"];

type NeocloudField = "firstname" | "lastname" | "email" | "company";

const NeocloudApplyPage = () => {
  useSeo();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    company: "",
    jobtitle: "",
    gpuLocations: "",
    fleetSize: "",
    timeline: "",
    message: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<ReactNode>(null);
  const [errors, setErrors] = useState<FieldErrors<NeocloudField>>({});

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validateFields<NeocloudField>({
      firstname: { value: form.firstname, required: true },
      lastname: { value: form.lastname, required: true },
      email: { value: form.email, required: true, email: true },
      company: { value: form.company, required: true },
    });
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    if (!HS_NEOCLOUD_FORM_GUID) {
      setError(
        <>
          Applications aren't open online yet. In the meantime, please{" "}
          <a href="/contact-sales" className="font-medium text-danger-700 underline">contact our sales team</a>.
        </>
      );
      return;
    }
    setLoading(true);
    setError(null);

    const optional = (name: string, value: string) =>
      value ? [{ objectTypeId: "0-2", name, value }] : [];

    const result = await submitHubSpotForm({
      formGuid: HS_NEOCLOUD_FORM_GUID,
      pageName: "Neocloud Contact",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-2", name: "name", value: form.company },
        ...(form.jobtitle ? [{ objectTypeId: "0-1", name: "jobtitle", value: form.jobtitle }] : []),
        ...optional("gpu_locations", form.gpuLocations),
        ...optional("gpu_fleet_size", form.fleetSize),
        ...optional("start_timeline", form.timeline),
        ...optional("tell_us_about_your_business", form.message),
      ],
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "By clicking submit, you consent to allow Fil One to store and process the information submitted.",
          communications: [
            {
              value: form.consent,
              subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
              text: "I agree to receive other communications from Fil One.",
            },
          ],
        },
      },
    });

    setLoading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSubmitted(true);
    trackEvent("Form Submit", { form: "neocloud-apply", page: window.location.pathname });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Neoclouds</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Talk to our neocloud team
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500 text-pretty">
              Tell us about your platform and where your compute runs. Our team will get back to you shortly.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess
              title="Thanks, we'll be in touch"
              align="center"
              action={<a href="/neocloud" className="btn-secondary">Back to Neoclouds</a>}
            >
              We'll review your details and reach out within 2 business days.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              <div className="grid grid-cols-2 gap-4">
                <TextField label="First name" required type="text" placeholder="Jane" value={form.firstname} onChange={set("firstname")} error={errors.firstname} />
                <TextField label="Last name" required type="text" placeholder="Smith" value={form.lastname} onChange={set("lastname")} error={errors.lastname} />
              </div>

              <TextField label="Work email" required type="email" placeholder="jane@acme.com" value={form.email} onChange={set("email")} error={errors.email} />

              <div className="grid grid-cols-2 gap-4">
                <TextField label="Company name" required type="text" placeholder="Acme GPU Cloud" value={form.company} onChange={set("company")} error={errors.company} />
                <TextField label="Job title" type="text" placeholder="Head of Infrastructure" value={form.jobtitle} onChange={set("jobtitle")} />
              </div>

              <TextField
                label="Where are your GPUs located?"
                type="text"
                placeholder="e.g. our own facility in Frankfurt, colocation in Dallas"
                value={form.gpuLocations}
                onChange={set("gpuLocations")}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField label="GPU fleet size" value={form.fleetSize} onChange={set("fleetSize")}>
                  <option value="">Select…</option>
                  {FLEET_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </SelectField>
                <SelectField label="When are you looking to start?" value={form.timeline} onChange={set("timeline")}>
                  <option value="">Select…</option>
                  {TIMELINES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </SelectField>
              </div>

              <TextAreaField
                label="Tell us about your platform"
                value={form.message}
                onChange={set("message")}
                placeholder="Who your customers are, what they store today, and which workload you would start with."
                className="min-h-[110px]"
              />

              <div className="h-px w-full bg-black/[0.07]" />

              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One is committed to protecting your privacy. We'll only use your personal information to administer your account and provide the products and services you requested. From time to time we'd like to contact you about our products and services.
              </p>

              <Checkbox checked={form.consent} onChange={(checked) => setForm((f) => ({ ...f, consent: checked }))}>
                I agree to receive other communications from Fil One.
              </Checkbox>

              <p className="font-sans font-normal text-[12.5px] leading-[1.7] text-zinc-500">
                You can unsubscribe at any time. For more information, review our{" "}
                <a href="/privacy" className="text-zinc-500 underline">Privacy Policy</a>.
                {" "}By clicking submit, you consent to allow Fil One to store and process the information submitted.
              </p>

              {error && <FormError>{error}</FormError>}

              <SubmitButton loading={loading}>
                {loading ? "Submitting…" : "Submit"}
              </SubmitButton>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NeocloudApplyPage;
