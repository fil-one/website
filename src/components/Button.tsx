import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonOwnProps {
  variant: "primary" | "secondary";
  /** Primary only — maps to .btn-primary-sm / .btn-primary-lg */
  size?: "sm" | "lg";
  /** Maps to .btn-primary-dark/.btn-secondary-dark or .btn-primary-zinc */
  tone?: "dark" | "zinc";
  /** Primary only — animated gradient border, for hero-style CTAs */
  glow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

type LinkProps = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string };

type NativeButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

/**
 * Wraps the site's .btn-primary/.btn-secondary CSS (defined in index.css).
 * Renders an <a> when `href` is given, otherwise a native <button>.
 */
export const Button = ({ variant, size, tone, glow, fullWidth, children, className, ...rest }: ButtonProps) => {
  const classes = [
    variant === "primary" ? "btn-primary" : "btn-secondary",
    size && `btn-${variant}-${size}`,
    tone && `btn-${variant}-${tone}`,
    variant === "primary" && glow && "btn-primary-glow",
    fullWidth && "w-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content =
    variant === "primary" ? (
      <span className={fullWidth ? "btn-primary-inner w-full justify-center" : "btn-primary-inner"}>{children}</span>
    ) : (
      children
    );

  if (rest.href) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
};
