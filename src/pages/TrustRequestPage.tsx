import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import Icon from "@/components/Icon";
import TextLink from "@/components/TextLink";
import { useSeo } from "@/hooks/useSeo";
import {
  TextField,
  TextAreaField,
  CheckboxField,
  Checkbox,
  SubmitButton,
  FormSuccess,
  FormError,
} from "@/components/FormControls";
import {
  HS_TRUST_REQUEST_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  submitHubSpotForm,
} from "@/lib/hubspot";
import { validateFields, hasErrors, focusFirstInvalid, type FieldErrors } from "@/lib/formValidation";
import { TRUST_DOCUMENTS } from "@/lib/trustDocuments";

type RequestField = "firstname" | "lastname" | "company" | "email" | "documents";

const TrustRequestPage = () => {
  useSeo();
  const [params] = useSearchParams();

  const [form, setForm] = useState(() => {
    const preselected = params.get("doc");
    return {
      firstname: "",
      lastname: "",
      company: "",
      email: "",
      documents: TRUST_DOCUMENTS.some((d) => d.value === preselected) ? [preselected as string] : [],
      note: "",
      consent: false,
    };
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors<RequestField>>({});

  const set = (key: Exclude<RequestField, "documents"> | "note") => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const toggleDocument = (value: string) => {
    setForm((f) => ({
      ...f,
      documents: f.documents.includes(value) ? f.documents.filter((d) => d !== value) : [...f.documents, value],
    }));
    setErrors((errs) => ({ ...errs, documents: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validateFields<RequestField>({
      firstname: { value: form.firstname, required: true },
      lastname: { value: form.lastname, required: true },
      company: { value: form.company, required: true },
      email: { value: form.email, required: true, email: true },
      documents: {
        value: form.documents.join(";"),
        required: true,
        message: "Select at least one document.",
      },
    });
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_TRUST_REQUEST_FORM_GUID,
      pageName: "Trust Center Document Request",
      fields: [
        { objectTypeId: "0-1", name: "firstname", value: form.firstname },
        { objectTypeId: "0-1", name: "lastname", value: form.lastname },
        { objectTypeId: "0-1", name: "company", value: form.company },
        { objectTypeId: "0-1", name: "email", value: form.email },
        // TODO: match these to the HubSpot form's property names once it exists.
        // Multi-checkbox properties take semicolon-separated option values.
        { objectTypeId: "0-1", name: "trust_documents_requested", value: form.documents.join(";") },
        { objectTypeId: "0-1", name: "trust_request_note", value: form.note },
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
    trackEvent("Form Submit", { form: "trust-request", page: window.location.pathname });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <PlatformNavbar />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <a
              href="/trust"
              className="mb-3 inline-flex w-fit items-center gap-1.5 font-sans text-body-sm text-zinc-500 no-underline transition-colors hover:text-zinc-950"
            >
              <Icon icon={ArrowLeft} size={14} />
              Trust center
            </a>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Request security documents
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Tell us what your review needs and we'll send it to your work email.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess
              title="Thanks, we've got your request"
              action={<TextLink href="/trust" tone="brand" arrow>Back to the trust center</TextLink>}
            >
              {/* TODO(confirm before publishing): the response window with whoever owns these requests. */}
              We'll send your documents to {form.email} within a few business days.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              <CheckboxField
                legend="Which documents do you need?"
                required
                options={TRUST_DOCUMENTS}
                values={form.documents}
                onToggle={toggleDocument}
                error={errors.documents}
              />

              <div className="h-px w-full bg-black/[0.07]" />

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="First name"
                  required
                  type="text"
                  autoComplete="given-name"
                  value={form.firstname}
                  onChange={set("firstname")}
                  placeholder="Jane"
                  error={errors.firstname}
                />
                <TextField
                  label="Last name"
                  required
                  type="text"
                  autoComplete="family-name"
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
                autoComplete="organization"
                value={form.company}
                onChange={set("company")}
                placeholder="Acme Inc."
                error={errors.company}
              />

              <TextField
                label="Work email"
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                placeholder="jane@acme.com"
                error={errors.email}
              />

              <TextAreaField
                label="Anything else we should know?"
                rows={4}
                value={form.note}
                onChange={set("note")}
                placeholder="For example, your company's legal entity name"
              />

              <div className="h-px w-full bg-black/[0.07]" />

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

              <div className="flex flex-col gap-2 pt-1">
                <SubmitButton loading={loading}>
                  {loading ? "Submitting…" : "Request documents"}
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

export default TrustRequestPage;
