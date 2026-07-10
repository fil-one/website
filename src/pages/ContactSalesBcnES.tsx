import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import PlatformNavbar from "@/components/PlatformNavbar";
import LandingFooter from "@/components/LandingFooter";
import { useSeo } from "@/hooks/useSeo";
import { useLang } from "@/hooks/useLang";
import {
  HS_PORTAL_ID,
  HS_CONTACT_FORM_GUID as HS_FORM_GUID,
  HS_MARKETING_SUBSCRIPTION_TYPE_ID,
  getHubSpotContext,
} from "@/lib/hubspot";

const DATA_OPTIONS = [
  "0-1 TB",
  "1-10 TB",
  "10-100 TB",
  "100-500 TB",
  "500-1,000 TB",
  "1+ PB",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid rgba(0,0,0,0.10)",
  borderRadius: 10,
  padding: "10px 14px",
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 400,
  fontSize: 14.5,
  color: "#09090B",
  backgroundColor: "#FFFFFF",
  outline: "none",
  transition: "border-color 150ms ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Funnel Sans', sans-serif",
  fontWeight: 500,
  fontSize: 13.5,
  color: "#3F3F46",
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label className="flex flex-col gap-1.5">
    <span style={labelStyle}>
      {label}
      {required && <span aria-hidden="true" style={{ color: "#DC2626", marginLeft: 2 }}>*</span>}
    </span>
    {children}
  </label>
);

const ContactSalesBcnES = () => {
  useLang("es");
  useSeo({
    title: "Contactar con ventas — Fil One Almacenamiento S3",
    description: "Habla con el equipo de Fil One sobre almacenamiento de objetos S3 compatible, precios para empresas y acuerdos de nivel de servicio.",
    canonical: "https://fil.one/lp/es/contacto",
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
  ) => setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.dataStorage) {
      setRadioError(true);
      return;
    }
    setLoading(true);
    setError(null);
    setRadioError(false);
    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_GUID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { objectTypeId: "0-1", name: "firstname", value: form.firstname },
              { objectTypeId: "0-1", name: "lastname", value: form.lastname },
              { objectTypeId: "0-1", name: "company", value: form.company },
              { objectTypeId: "0-1", name: "email", value: form.email },
              { objectTypeId: "0-1", name: "how_much_data_are_you_looking_to_store", value: form.dataStorage },
            ],
            context: getHubSpotContext("Barcelona ES Contacto"),
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
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const msg = body?.errors?.map((e: { message: string }) => e.message).join(" | ") || body?.message || JSON.stringify(body);
        console.error("HubSpot submission error:", body);
        setError(msg);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Error de red — por favor, comprueba tu conexión y vuelve a intentarlo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#FFFFFF" }}>
      <PlatformNavbar lang="es" supportHref="/lp/es/soporte" contactSalesHref="/lp/es/contacto" />

      <main className="flex flex-col items-center px-5 md:px-8 pt-36 pb-24 w-full">
        <div className="flex flex-col gap-10 w-full max-w-[560px]">

          <div className="flex flex-col gap-3">
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 500,
                fontSize: 11.5,
                letterSpacing: "0.08em",
                color: "#71717A",
                textTransform: "uppercase",
              }}
            >
              Contactar con ventas
            </p>
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
              Habla con nuestro equipo
            </h1>
            <p
              style={{
                fontFamily: "'Funnel Sans', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                lineHeight: "1.6",
                color: "#71717A",
              }}
            >
              Cuéntanos sobre tu caso de uso y nos pondremos en contacto contigo pronto.
            </p>
          </div>

          <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

          {submitted ? (
            <div className="flex flex-col gap-3 py-6">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full"
                style={{ backgroundColor: "#F0FDF4" }}
              >
                <Check size={18} color="#22C55E" />
              </div>
              <p style={{ fontFamily: "'Aspekta', sans-serif", fontWeight: 500, fontSize: 20, color: "#09090B", letterSpacing: "-0.01em" }}>
                Nos pondremos en contacto pronto.
              </p>
              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 14.5, color: "#71717A", lineHeight: "1.6" }}>
                Gracias por ponerte en contacto. Nuestro equipo revisará tu mensaje y te responderá en breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} data-hs-do-not-collect="true" className="flex flex-col gap-5">

              <div className="grid grid-cols-2 gap-4">
                <Field label="Nombre" required>
                  <input
                    type="text"
                    value={form.firstname}
                    onChange={set("firstname")}
                    placeholder="Ana"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
                <Field label="Apellido" required>
                  <input
                    type="text"
                    value={form.lastname}
                    onChange={set("lastname")}
                    placeholder="García"
                    required
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                  />
                </Field>
              </div>

              <Field label="Empresa" required>
                <input
                  type="text"
                  value={form.company}
                  onChange={set("company")}
                  placeholder="Acme Inc."
                  required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <Field label="Correo de trabajo" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="ana@empresa.com"
                  required
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,0,0,0.30)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(0,0,0,0.10)")}
                />
              </Field>

              <fieldset className="flex flex-col gap-3" style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={{ ...labelStyle, padding: 0 }}>
                  ¿Cuántos datos quieres almacenar?
                  <span aria-hidden="true" style={{ color: "#DC2626", marginLeft: 2 }}>*</span>
                </legend>
                {radioError && (
                  <p role="alert" style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>
                    Por favor, selecciona una opción.
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {DATA_OPTIONS.map((option) => {
                    const checked = form.dataStorage === option;
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer"
                        style={{ userSelect: "none" }}
                      >
                        <input
                          type="radio"
                          name="dataStorage"
                          value={option}
                          checked={checked}
                          onChange={() => { setForm((f) => ({ ...f, dataStorage: option })); setRadioError(false); }}
                          required
                          className="peer sr-only"
                        />
                        <span
                          className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                          style={{
                            width: 17,
                            height: 17,
                            borderRadius: "50%",
                            border: checked ? "5px solid #09090B" : "1.5px solid rgba(0,0,0,0.25)",
                            backgroundColor: "#FFFFFF",
                            flexShrink: 0,
                            transition: "border 150ms ease",
                            display: "inline-block",
                            outlineColor: "#0090FF",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'Funnel Sans', sans-serif",
                            fontWeight: 400,
                            fontSize: 14.5,
                            color: checked ? "#09090B" : "#52525B",
                            transition: "color 150ms ease",
                          }}
                        >
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="w-full" style={{ height: 1, backgroundColor: "rgba(0,0,0,0.07)" }} />

              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13, lineHeight: "1.7", color: "#71717A" }}>
                Fil One se compromete a proteger tu privacidad. Solo utilizaremos tu información personal para administrar tu cuenta y proporcionarte los productos y servicios que hayas solicitado. De vez en cuando, nos gustaría ponernos en contacto contigo sobre nuestros productos y servicios.
              </p>

              <label className="flex items-start gap-3 cursor-pointer" style={{ userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={set("consent")}
                  className="peer sr-only"
                />
                <span
                  className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: form.consent ? "none" : "1.5px solid rgba(0,0,0,0.25)",
                    backgroundColor: form.consent ? "#09090B" : "#FFFFFF",
                    flexShrink: 0,
                    marginTop: 2,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 150ms ease, border 150ms ease",
                    outlineColor: "#0090FF",
                  }}
                >
                  {form.consent && <Check size={10} color="#FFFFFF" />}
                </span>
                <span style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 13.5, color: "#52525B", lineHeight: "1.6" }}>
                  Acepto recibir otras comunicaciones de Fil One.
                </span>
              </label>

              <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontWeight: 400, fontSize: 12.5, lineHeight: "1.7", color: "#71717A" }}>
                Puedes darte de baja en cualquier momento. Para más información, consulta nuestra{" "}
                <a href="/privacy" style={{ color: "#71717A", textDecoration: "underline" }}>Política de privacidad</a>.
                Al hacer clic en enviar, consientes que Fil One almacene y procese la información enviada.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ border: "none", cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1, width: "100%" }}
                >
                  <span className="btn-primary-inner" style={{ padding: "11px 24px", fontSize: 15 }}>
                    {loading ? "Enviando…" : "Enviar"}
                  </span>
                </button>
                {error && (
                  <p style={{ fontFamily: "'Funnel Sans', sans-serif", fontSize: 13, color: "#DC2626", textAlign: "center" }}>
                    {error}
                  </p>
                )}
              </div>

            </form>
          )}

        </div>
      </main>

      <LandingFooter lang="es" />
    </div>
  );
};

export default ContactSalesBcnES;
