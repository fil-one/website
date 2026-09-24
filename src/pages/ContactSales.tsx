import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { SectionLabel } from "@/components/LandingPrimitives";
import {
  TextField,
  RadioField,
  Checkbox,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_CONTACT_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";
import { validateFields, hasErrors, focusFirstInvalid, type FieldErrors } from "@/lib/formValidation";

// Values are the HubSpot dropdown options (hyphenated); labels use en dashes.
const DATA_OPTIONS = [
  { value: "0-1 TB", label: "0–1 TB" },
  { value: "1-10 TB", label: "1–10 TB" },
  { value: "10-100 TB", label: "10–100 TB" },
  { value: "100-500 TB", label: "100–500 TB" },
  { value: "500-1,000 TB", label: "500–1,000 TB" },
  { value: "1+ PB", label: "1+ PB" },
];

type ContactField = "firstname" | "lastname" | "company" | "email" | "dataStorage";

const ContactSales = () => {
  useSeo();

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    company: "",
    email: "",
    dataStorage: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors<ContactField>>({});

  const set = (key: ContactField) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validateFields<ContactField>({
      firstname: { value: form.firstname, required: true },
      lastname: { value: form.lastname, required: true },
      company: { value: form.company, required: true },
      email: { value: form.email, required: true, email: true },
      dataStorage: { value: form.dataStorage, required: true, message: "Please select an option." },
    });
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_CONTACT_FORM_GUID,
      pageName: "Contact Sales",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-1", name: "email", value: form.email },
        { objectTypeId: "0-1", name: "how_much_data_are_you_looking_to_store", value: form.dataStorage },
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
    trackEvent("Form Submit", { form: "contact-sales", page: window.location.pathname });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Contact sales</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Talk to our team
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Tell us about your use case and we'll get back to you shortly.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess title="Thanks, we'll be in touch">
              Our team will review your message and get back to you shortly.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              {/* First / Last name row */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First name"
                  required
                  type="text"
                  value={form.firstname}
                  onChange={set("firstname")}
                  placeholder="Jane"
                  error={errors.firstname}
                />
                <TextField
                  label="Last name"
                  required
                  type="text"
                  value={form.lastname}
                  onChange={set("lastname")}
                  placeholder="Smith"
                  error={errors.lastname}
                />
              </div>

              <TextField
                label="Company name"
                required
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="Acme Inc."
                error={errors.company}
              />

              <TextField
                label="Work email"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="jane@acme.com"
                error={errors.email}
              />

              <RadioField
                legend="How much data are you looking to store?"
                name="dataStorage"
                required
                options={DATA_OPTIONS}
                value={form.dataStorage}
                onChange={(value) => {
                  setForm((f) => ({ ...f, dataStorage: value }));
                  setErrors((errs) => ({ ...errs, dataStorage: undefined }));
                }}
                error={errors.dataStorage}
              />

              <div className="h-px w-full bg-black/[0.07]" />

              {/* Consent text */}
              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One is committed to protecting your privacy. We'll only use your personal information to administer your account and provide the products and services you requested. From time to time we'd like to contact you about our products and services.
              </p>

              <Checkbox
                checked={form.consent}
                onChange={(checked) => setForm((f) => ({ ...f, consent: checked }))}
              >
                I agree to receive other communications from Fil One.
              </Checkbox>

              <p className="font-sans font-normal text-[12.5px] leading-[1.7] text-zinc-500">
                You can unsubscribe at any time. For more information, review our{" "}
                <a href="/privacy" className="text-zinc-500 underline">Privacy Policy</a>.
                {" "}By clicking submit, you consent to allow Fil One to store and process the information submitted.
              </p>

              {/* Submit */}
              <div className="flex flex-col gap-2 pt-1">
                <SubmitButton loading={loading}>
                  {loading ? "Submitting…" : "Submit"}
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

export default ContactSales;
