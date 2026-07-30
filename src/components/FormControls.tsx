import type { ReactNode } from "react";
import { Check, CaretDown } from "@phosphor-icons/react";

/**
 * Shared form primitives for the marketing forms (contact, support, partner
 * apply, waitlists). Tokenized visuals + baked-in a11y so every form stays
 * consistent and accessible. Compose these — there is no monolithic "form"
 * component, because the pages differ (single object of state vs per-field
 * state, radio vs multi-select checkbox groups).
 *
 * Pair with `submitHubSpotForm` in `lib/hubspot`. Callers keep
 * `data-hs-do-not-collect="true"` on the `<form>` element itself.
 */

/** Tokenized styling shared by text inputs, textareas and selects. */
export const FIELD_INPUT_CLASS =
  "w-full rounded-[10px] border border-black/10 bg-white px-3.5 py-2.5 font-sans text-[14.5px] font-normal text-zinc-950 transition-colors placeholder:text-zinc-400 focus:border-black/30";

const REQUIRED_MARK = (
  <span aria-hidden="true" className="ml-0.5 text-danger-600">
    *
  </span>
);

const LABEL_CLASS = "font-sans font-medium text-[13.5px] text-zinc-700";

/** Labelled field wrapper: label text (+ optional required asterisk) over its control. */
export const FormField = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <label className="flex flex-col gap-1.5">
    <span className={LABEL_CLASS}>
      {label}
      {required && REQUIRED_MARK}
    </span>
    {children}
  </label>
);

/** The common case: a labelled single-line text/email input. */
export const TextField = ({
  label,
  required,
  className,
  ...inputProps
}: {
  label: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
  <FormField label={label} required={required}>
    <input
      required={required}
      className={`${FIELD_INPUT_CLASS}${className ? ` ${className}` : ""}`}
      {...inputProps}
    />
  </FormField>
);

/** A labelled multi-line textarea. */
export const TextAreaField = ({
  label,
  required,
  className,
  ...textareaProps
}: {
  label: string;
  required?: boolean;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <FormField label={label} required={required}>
    <textarea
      required={required}
      className={`${FIELD_INPUT_CLASS} resize-y leading-[1.6]${className ? ` ${className}` : ""}`}
      {...textareaProps}
    />
  </FormField>
);

/** A labelled native select with the shared chevron affordance. Pass `<option>`s as children. */
export const SelectField = ({
  label,
  required,
  children,
  className,
  ...selectProps
}: {
  label: string;
  required?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <FormField label={label} required={required}>
    <div className="relative">
      <select
        required={required}
        className={`${FIELD_INPUT_CLASS} cursor-pointer appearance-none pr-9${className ? ` ${className}` : ""}`}
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

/** Single-select custom radio group inside a labelled fieldset. */
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
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  /** Validation message announced via role="alert" when set. */
  error?: string;
}) => (
  <fieldset className="m-0 flex flex-col gap-3 border-none p-0">
    {/* A <legend> is not a flex item, so the fieldset's gap never spaces it
        from the options — the heading→options gap must live on the legend. */}
    <legend className={`mb-3 p-0 ${LABEL_CLASS}`}>
      {legend}
      {required && REQUIRED_MARK}
    </legend>
    {error && (
      <p role="alert" className="font-sans text-[13px] text-danger-600">
        {error}
      </p>
    )}
    <div className="flex flex-col gap-2">
      {options.map((option) => {
        const checked = value === option;
        return (
          <label
            key={option}
            className="flex cursor-pointer select-none items-center gap-3"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={checked}
              onChange={() => onChange(option)}
              required={required}
              className="peer sr-only"
            />
            <span
              className={`inline-block h-[17px] w-[17px] flex-shrink-0 rounded-full bg-white transition-[border] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500 ${
                checked
                  ? "border-[5px] border-zinc-950"
                  : "border-[1.5px] border-black/25"
              }`}
            />
            <span
              className={`font-sans text-[14.5px] transition-colors ${
                checked ? "text-zinc-950" : "text-zinc-600"
              }`}
            >
              {option}
            </span>
          </label>
        );
      })}
    </div>
  </fieldset>
);

const CHECKBOX_BOX_BASE =
  "inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-[4px] transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500";

/** Classes for the custom checkbox box, given its checked state and tone. */
const checkboxBoxClass = (checked: boolean, tone: "dark" | "brand" = "dark") =>
  `${CHECKBOX_BOX_BASE} ${
    checked
      ? tone === "brand"
        ? "border-none bg-brand-500"
        : "border-none bg-zinc-950"
      : "border-[1.5px] border-black/25 bg-white"
  }`;

/**
 * Single-select radio group rendered as bordered cards, each with an optional
 * description. Selected card gets a brand tint. Uses a native radio (keyboard
 * accessible) accented to the brand colour.
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
  /** Validation message announced via role="alert" when set. */
  error?: string;
}) => (
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
              selected ? "border-brand-500/50 bg-brand-50" : "border-black/[0.09] bg-white"
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
            />
            <div>
              <p className="m-0 font-sans font-medium text-[14px] text-zinc-950">{label}</p>
              {sub && <p className="m-0 font-sans text-[12.5px] text-zinc-500">{sub}</p>}
            </div>
          </label>
        );
      })}
    </div>
    {error && (
      <p role="alert" className="font-sans text-[13px] text-danger-600">
        {error}
      </p>
    )}
  </fieldset>
);

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
  /** Validation message announced via role="alert" when set. */
  error?: string;
}) => (
  <fieldset className="m-0 flex flex-col gap-3 border-none p-0">
    {/* A <legend> is not a flex item, so the heading→options gap lives here. */}
    <legend className={`mb-3 p-0 ${LABEL_CLASS}`}>
      {legend}
      {required && REQUIRED_MARK}
    </legend>
    {error && (
      <p role="alert" className="font-sans text-[13px] text-danger-600">
        {error}
      </p>
    )}
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
            />
            <span className={checkboxBoxClass(checked)}>
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
  </fieldset>
);

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
    className="rounded-[8px] border border-danger-600/20 bg-danger-50 px-3.5 py-2.5 font-sans text-[13.5px] text-danger-600"
  >
    {children}
  </p>
);
