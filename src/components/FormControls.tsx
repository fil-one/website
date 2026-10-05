import { useId, type ReactNode } from "react";
import { Check, CaretDown } from "@phosphor-icons/react";

/**
 * Shared form primitives for the marketing forms (contact, support, partner
 * apply, waitlists). Tokenized visuals + baked-in a11y so every form stays
 * consistent and accessible. Compose these; there is no monolithic "form"
 * component, because the pages differ (single object of state vs per-field
 * state, radio vs multi-select checkbox groups).
 *
 * Validation: forms set `noValidate` and validate with `lib/formValidation`,
 * then pass each message as `error`. The field renders it inline and sets
 * `aria-invalid` + `aria-describedby`; `focusFirstInvalid` moves focus.
 *
 * Pair with `submitHubSpotForm` in `lib/hubspot`. Callers keep
 * `data-hs-do-not-collect="true"` on the `<form>` element itself.
 */

/**
 * Tokenized styling shared by text inputs, textareas and selects. Rests on the
 * light `input-rest` border (below WCAG 1.4.11's 3:1, by design choice) and
 * darkens to the 3:1 `input` border on hover; focus adds the site's 2px
 * brand outline, and invalid fields switch to the danger border.
 */
export const FIELD_INPUT_CLASS =
  "w-full rounded-[10px] border border-input-rest hover:border-input bg-white px-3.5 py-2.5 font-sans text-[14.5px] font-normal text-zinc-950 transition-colors placeholder:text-zinc-500 focus:border-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 aria-[invalid=true]:border-danger-600";

const REQUIRED_MARK = (
  <span aria-hidden="true" className="ml-0.5 text-danger-600">
    *
  </span>
);

const LABEL_CLASS = "font-sans font-medium text-[13.5px] text-zinc-700";

/** Inline validation message; its id is referenced by the control's aria-describedby. */
const FieldError = ({ id, children }: { id: string; children: ReactNode }) => (
  <p id={id} className="m-0 font-sans text-[13px] text-danger-600">
    {children}
  </p>
);

/** Id + ARIA props shared by the single-control fields. */
const useFieldA11y = (id: string | undefined, error: string | undefined) => {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  return {
    fieldId,
    errorId,
    aria: {
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": error ? errorId : undefined,
    },
  };
};

/** Labelled field wrapper: label text (+ optional required asterisk) over its control, then any error. */
export const FormField = ({
  label,
  htmlFor,
  required,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  errorId?: string;
  children: ReactNode;
}) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
      {label}
      {required && REQUIRED_MARK}
    </label>
    {children}
    {error && <FieldError id={errorId ?? `${htmlFor}-error`}>{error}</FieldError>}
  </div>
);

type FieldProps = {
  label: string;
  required?: boolean;
  /** Validation message; marks the control invalid and describes it. */
  error?: string;
};

/** The common case: a labelled single-line text/email input. */
export const TextField = ({
  label,
  required,
  error,
  className,
  id,
  ...inputProps
}: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const { fieldId, errorId, aria } = useFieldA11y(id, error);
  return (
    <FormField label={label} htmlFor={fieldId} required={required} error={error} errorId={errorId}>
      <input
        id={fieldId}
        required={required}
        className={`${FIELD_INPUT_CLASS}${className ? ` ${className}` : ""}`}
        {...aria}
        {...inputProps}
      />
    </FormField>
  );
};

/** A labelled multi-line textarea. */
export const TextAreaField = ({
  label,
  required,
  error,
  className,
  id,
  ...textareaProps
}: FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { fieldId, errorId, aria } = useFieldA11y(id, error);
  return (
    <FormField label={label} htmlFor={fieldId} required={required} error={error} errorId={errorId}>
      <textarea
        id={fieldId}
        required={required}
        className={`${FIELD_INPUT_CLASS} resize-y leading-[1.6]${className ? ` ${className}` : ""}`}
        {...aria}
        {...textareaProps}
      />
    </FormField>
  );
};

/** A labelled native select with the shared chevron affordance. Pass `<option>`s as children. */
export const SelectField = ({
  label,
  required,
  error,
  children,
  className,
  id,
  ...selectProps
}: FieldProps & React.SelectHTMLAttributes<HTMLSelectElement>) => {
  const { fieldId, errorId, aria } = useFieldA11y(id, error);
  return (
    <FormField label={label} htmlFor={fieldId} required={required} error={error} errorId={errorId}>
      <div className="relative">
        <select
          id={fieldId}
          required={required}
          className={`${FIELD_INPUT_CLASS} cursor-pointer appearance-none pr-9${className ? ` ${className}` : ""}`}
          {...aria}
          {...selectProps}
        >
          {children}
        </select>
        <CaretDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
        />
      </div>
    </FormField>
  );
};

/** Error id + ARIA props for every input in a choice group (radios, checkboxes). */
const useGroupA11y = (error: string | undefined) => {
  const errorId = `${useId()}-error`;
  return {
    errorId,
    aria: {
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": error ? errorId : undefined,
    },
  };
};

/**
 * Single-select custom radio group inside a labelled fieldset. Options are
 * plain strings, or `{ value, label }` when the submitted value must differ
 * from the visible label (e.g. a HubSpot enum kept with a hyphen).
 */
export const RadioField = ({
  legend,
  name,
  options,
  value,
  onChange,
  required,
  error,
}: {
  legend: string;
  name: string;
  options: (string | { value: string; label: string })[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  /** Validation message; marks the options invalid and describes them. */
  error?: string;
}) => {
  const { errorId, aria } = useGroupA11y(error);
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-none p-0">
      {/* A <legend> is not a flex item, so the fieldset's gap never spaces it
          from the options; the heading→options gap must live on the legend. */}
      <legend className={`mb-3 p-0 ${LABEL_CLASS}`}>
        {legend}
        {required && REQUIRED_MARK}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const { value: optionValue, label } =
            typeof option === "string" ? { value: option, label: option } : option;
          const checked = value === optionValue;
          return (
            <label
              key={optionValue}
              className="flex cursor-pointer select-none items-center gap-3"
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={checked}
                onChange={() => onChange(optionValue)}
                required={required}
                className="peer sr-only"
                {...aria}
              />
              <span
                className={`inline-block h-[17px] w-[17px] flex-shrink-0 rounded-full bg-white transition-[border] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 ${
                  checked
                    ? "border-[5px] border-zinc-950"
                    : error
                      ? "border-[1.5px] border-danger-600"
                      : "border-[1.5px] border-input"
                }`}
              />
              <span
                className={`font-sans text-[14.5px] transition-colors ${
                  checked ? "text-zinc-950" : "text-zinc-600"
                }`}
              >
                {label}
              </span>
            </label>
          );
        })}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
};

const CHECKBOX_BOX_BASE =
  "inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500";

/** Classes for the custom checkbox box, given its checked state and tone. */
const checkboxBoxClass = (
  checked: boolean,
  tone: "dark" | "brand" = "dark",
  invalid = false,
) =>
  `${CHECKBOX_BOX_BASE} ${
    checked
      ? tone === "brand"
        ? "border-none bg-brand-500"
        : "border-none bg-zinc-950"
      : `border-[1.5px] ${invalid ? "border-danger-600" : "border-input"} bg-white`
  }`;

/**
 * Single-select radio group rendered as bordered cards, each with an optional
 * description. Selected card gets a brand tint. Uses a native radio (keyboard
 * accessible) accented to the brand color.
 */
export const RadioCardField = ({
  legend,
  name,
  options,
  value,
  onChange,
  required,
  error,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string; sub?: string }[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  /** Validation message; marks the options invalid and describes them. */
  error?: string;
}) => {
  const { errorId, aria } = useGroupA11y(error);
  return (
    <fieldset className="m-0 flex flex-col gap-2 border-none p-0">
      {/* A <legend> is not a flex item, so the heading→options gap lives here. */}
      <legend className={`mb-3 p-0 ${LABEL_CLASS}`}>
        {legend}
        {required && REQUIRED_MARK}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map(({ value: optionValue, label, sub }) => {
          const selected = value === optionValue;
          return (
            <label
              key={optionValue}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                selected
                  ? "border-brand-500/50 bg-brand-50"
                  : error
                    ? "border-danger-600 bg-white"
                    : "border-black/[0.09] bg-white"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={selected}
                onChange={() => onChange(optionValue)}
                required={required}
                className="accent-brand-600"
                {...aria}
              />
              <div>
                <p className="m-0 font-sans font-medium text-[14px] text-zinc-950">{label}</p>
                {sub && <p className="m-0 font-sans text-[12.5px] text-zinc-500">{sub}</p>}
              </div>
            </label>
          );
        })}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
};

/**
 * Controlled custom checkbox with its label content. `tone="dark"` (default)
 * is the consent/agreement style; `tone="brand"` is the blue style. Aligned
 * to the top of the label so multi-line consent copy stays tidy.
 */
export const Checkbox = ({
  checked,
  onChange,
  tone = "dark",
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  tone?: "dark" | "brand";
  children: ReactNode;
}) => (
  <label className="flex cursor-pointer select-none items-start gap-3">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="peer sr-only"
    />
    <span className={`${checkboxBoxClass(checked, tone)} mt-0.5`}>
      {checked && <Check size={10} weight="bold" className="text-white" />}
    </span>
    <span className="font-sans font-normal text-[13.5px] leading-[1.6] text-zinc-600">
      {children}
    </span>
  </label>
);

/** Multi-select custom checkbox group inside a labelled fieldset. */
export const CheckboxField = ({
  legend,
  options,
  values,
  onToggle,
  required,
  error,
}: {
  legend: string;
  options: { label: string; value: string }[];
  values: string[];
  onToggle: (value: string) => void;
  required?: boolean;
  /** Validation message; marks the options invalid and describes them. */
  error?: string;
}) => {
  const { errorId, aria } = useGroupA11y(error);
  return (
    <fieldset className="m-0 flex flex-col gap-3 border-none p-0">
      {/* A <legend> is not a flex item, so the heading→options gap lives here. */}
      <legend className={`mb-3 p-0 ${LABEL_CLASS}`}>
        {legend}
        {required && REQUIRED_MARK}
      </legend>
      <div className="flex flex-col gap-2">
        {options.map(({ label, value }) => {
          const checked = values.includes(value);
          return (
            <label
              key={value}
              className="flex cursor-pointer select-none items-center gap-3"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(value)}
                className="peer sr-only"
                {...aria}
              />
              <span className={checkboxBoxClass(checked, "dark", Boolean(error))}>
                {checked && <Check size={10} weight="bold" className="text-white" />}
              </span>
              <span
                className={`font-sans text-[14.5px] transition-colors ${
                  checked ? "text-zinc-950" : "text-zinc-600"
                }`}
              >
                {label}
              </span>
            </label>
          );
        })}
      </div>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </fieldset>
  );
};

/** Full-width primary submit button with a loading state. */
export const SubmitButton = ({
  loading,
  disabled,
  children,
}: {
  loading?: boolean;
  /** Extra disabled condition beyond `loading` (e.g. an unfilled required field). */
  disabled?: boolean;
  children: ReactNode;
}) => (
  <button
    type="submit"
    disabled={loading || disabled}
    className="btn-primary w-full cursor-pointer border-none disabled:cursor-default disabled:opacity-70"
  >
    <span className="btn-primary-inner px-6 py-[11px] text-[15px]">
      {children}
    </span>
  </button>
);

/**
 * Post-submit success panel, announced to assistive tech via role="status".
 * `align="center"` centers it and adds more vertical padding; `action` renders
 * an optional CTA (e.g. a link back) below the message.
 */
export const FormSuccess = ({
  title,
  children,
  align = "start",
  action,
}: {
  title: string;
  children: ReactNode;
  align?: "start" | "center";
  action?: ReactNode;
}) => {
  const centered = align === "center";
  return (
    <div
      role="status"
      className={`flex flex-col gap-3 ${centered ? "items-center py-10 text-center" : "py-6"}`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-50">
        <Check size={18} className="text-success-500" />
      </div>
      <p className="font-display font-medium text-[20px] tracking-[-0.01em] text-zinc-950">
        {title}
      </p>
      <p className="font-sans font-normal text-[14.5px] leading-[1.6] text-zinc-500">
        {children}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};

/** Form-level error message, announced to assistive tech via role="alert". */
export const FormError = ({ children }: { children: ReactNode }) => (
  <p
    role="alert"
    className="rounded-[8px] border border-danger-600/20 bg-danger-50 px-3.5 py-2.5 font-sans text-[13.5px] text-danger-700"
  >
    {children}
  </p>
);
