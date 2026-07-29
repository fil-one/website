import { useState } from "react";
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

const DATA_OPTIONS = [
  "0-1 TB",
  "1-10 TB",
  "10-100 TB",
  "100-500 TB",
  "500-1,000 TB",
  "1+ PB",
];

const ContactSalesBcnES = () => {
  useLang("es");
  useSeo({
    title: "Contactar con ventas · Fil One Almacenamiento S3",
    description: "Habla con el equipo de Fil One sobre almacenamiento de objetos S3 compatible, precios para empresas y acuerdos de nivel de servicio.",
    canonical: "https://www.fil.one/lp/es/contacto",
  });

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
  const [radioError, setRadioError] = useState(false);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dataStorage) {
      setRadioError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setRadioError(false);

    const result = await submitHubSpotForm({
      formGuid: HS_CONTACT_FORM_GUID,
      pageName: "Barcelona ES Contacto",
      networkErrorMessage: "Error de red. Por favor, comprueba tu conexión y vuelve a intentarlo.",
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
            <FormSuccess title="Nos pondremos en contacto pronto.">
              Gracias por ponerte en contacto. Nuestro equipo revisará tu mensaje y te responderá en breve.
            </FormSuccess>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Nombre"
                  required
                  type="text"
                  value={form.firstname}
                  onChange={set("firstname")}
                  placeholder="Ana"
                />
                <TextField
                  label="Apellido"
                  required
                  type="text"
                  value={form.lastname}
                  onChange={set("lastname")}
                  placeholder="García"
                />
              </div>

              <TextField
                label="Empresa"
                required
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder="Acme Inc."
              />

              <TextField
                label="Correo de trabajo"
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="ana@empresa.com"
              />

              <RadioField
                legend="¿Cuántos datos quieres almacenar?"
                name="dataStorage"
                required
                options={DATA_OPTIONS}
                value={form.dataStorage}
                onChange={(value) => { setForm((f) => ({ ...f, dataStorage: value })); setRadioError(false); }}
                error={radioError ? "Por favor, selecciona una opción." : undefined}
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
