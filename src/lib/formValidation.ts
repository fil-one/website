/**
 * Shared client-side validation for the marketing forms. Every form sets
 * `noValidate` and runs these checks instead, so errors look and behave the
 * same everywhere: an inline message under the field (wired up by the
 * FormControls primitives via `error`), `aria-invalid`, and focus moved to the
 * first invalid field.
 */

export type FormLang = "en" | "es";

export interface FieldRule {
  value: string | readonly string[];
  required?: boolean;
  email?: boolean;
  /** Overrides the default "required" message (e.g. for choice groups). */
  message?: string;
}

export type FieldErrors<K extends string> = Partial<Record<K, string>>;

const MESSAGES: Record<FormLang, { required: string; email: string }> = {
  en: {
    required: "This field is required.",
    email: "Enter a valid email address, like name@company.com.",
  },
  es: {
    required: "Este campo es obligatorio.",
    email: "Introduce un correo electrónico válido, como nombre@empresa.com.",
  },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value: string) => EMAIL_RE.test(value.trim());

/** Run the rules and return a message per invalid field (empty when valid). */
export function validateFields<K extends string>(
  rules: Record<K, FieldRule>,
  lang: FormLang = "en",
): FieldErrors<K> {
  const errors: FieldErrors<K> = {};
  for (const key of Object.keys(rules) as K[]) {
    const { value, required, email, message } = rules[key];
    const empty = typeof value === "string" ? value.trim() === "" : value.length === 0;
    if (required && empty) {
      errors[key] = message ?? MESSAGES[lang].required;
    } else if (email && !empty && typeof value === "string" && !isValidEmail(value)) {
      errors[key] = MESSAGES[lang].email;
    }
  }
  return errors;
}

export const hasErrors = (errors: object) => Object.keys(errors).length > 0;

/**
 * Focus the first control marked `aria-invalid="true"` inside the form, after
 * React has rendered the error state.
 */
export function focusFirstInvalid(form: HTMLFormElement | null) {
  requestAnimationFrame(() => {
    form?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  });
}
