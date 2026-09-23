import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import PlatformNavbar from "@/components/PlatformNavbar";
import Footer from "@/components/Footer";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/hooks/useLang";
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
  { value: "500-1,000 TB", label: "500–1.000 TB" },
  { value: "1+ PB", label: "1+ PB" },
];

type ContactField = "firstname" | "lastname" | "company" | "email" | "dataStorage";

const ContactSalesBcnES = () => {
  useLang("es");
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
    const fieldErrors = validateFields<ContactField>(
      {
        firstname: { value: form.firstname, required: true },
        lastname: { value: form.lastname, required: true },
        company: { value: form.company, required: true },
        email: { value: form.email, required: true, email: true },
        dataStorage: { value: form.dataStorage, required: true, message: "Por favor, selecciona una opción." },
      },
      "es",
    );
    setErrors(fieldErrors);
    if (hasErrors(fieldErrors)) {
      focusFirstInvalid(e.currentTarget);
      return;
    }
    setLoading(true);
    setError(null);

    const result = await submitHubSpotForm({
      formGuid: HS_CONTACT_FORM_GUID,
      pageName: "Barcelona ES Contacto",
      lang: "es",
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
          text: "Al hacer clic en enviar, consientes que Fil One almacene y procese la información enviada.",
          communications: [
            {
              value: form.consent,
              subscriptionTypeId: HS_MARKETING_SUBSCRIPTION_TYPE_ID,
              text: "Acepto recibir otras comunicaciones de Fil One.",
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
      <PlatformNavbar lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />

      <main id="main-content" className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          {/* Header */}
          <div className="flex flex-col gap-3">
            <SectionLabel>Contactar con ventas</SectionLabel>
            <h1 className="m-0 font-display font-medium text-[28px] md:text-[36px] leading-[1.15] tracking-[-0.02em] text-zinc-950">
              Habla con nuestro equipo
            </h1>
            <p className="m-0 font-sans font-normal text-[15px] leading-[1.6] text-zinc-500">
              Cuéntanos sobre tu caso de uso y nos pondremos en contacto contigo pronto.
            </p>
          </div>

          <div className="h-px w-full bg-black/[0.07]" />

          {submitted ? (
            <FormSuccess title="Gracias, nos pondremos en contacto">
              Nuestro equipo revisará tu mensaje y te responderá en breve.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-6" noValidate>

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Nombre"
                  required
                  type="text"
                  value={form.firstname}
                  onChange={set("firstname")}
                  placeholder="Ana"
                  error={errors.firstname}
                />
                <TextField
                  label="Apellido"
                  required
                  type="text"
                  value={form.lastname}
                  onChange={set("lastname")}
                  placeholder="García"
                  error={errors.lastname}
                />
              </div>

              <TextField
                label="Empresa"
                required
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="Acme Inc."
                error={errors.company}
              />

              <TextField
                label="Correo de trabajo"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="ana@empresa.com"
                error={errors.email}
              />

              <RadioField
                legend="¿Cuántos datos quieres almacenar?"
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

              <p className="font-sans font-normal text-[13px] leading-[1.7] text-zinc-500">
                Fil One se compromete a proteger tu privacidad. Solo utilizaremos tu información personal para administrar tu cuenta y proporcionarte los productos y servicios que hayas solicitado. De vez en cuando, nos gustaría ponernos en contacto contigo sobre nuestros productos y servicios.
              </p>

              <Checkbox
                checked={form.consent}
                onChange={(checked) => setForm((f) => ({ ...f, consent: checked }))}
              >
                Acepto recibir otras comunicaciones de Fil One.
              </Checkbox>

              <p className="font-sans font-normal text-[12.5px] leading-[1.7] text-zinc-500">
                Puedes darte de baja en cualquier momento. Para más información, consulta nuestra{" "}
                <a href="/privacy" className="text-zinc-500 underline">Política de privacidad</a>.
                {" "}Al hacer clic en enviar, consientes que Fil One almacene y procese la información enviada.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <SubmitButton loading={loading}>
                  {loading ? "Enviando…" : "Enviar"}
                </SubmitButton>
                {error && <FormError>{error}</FormError>}
              </div>

            </form>
          )}

        </div>
      </main>

      <Footer lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />
    </div>
  );
};

export default ContactSalesBcnES;
