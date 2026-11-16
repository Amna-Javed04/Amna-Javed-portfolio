import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill font-medium uppercase leading-none tracking-[0.16em] transition-[transform,colors,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-[#14081f] shadow-glow-strong hover:bg-[#c084fc]",
  outline:
    "border border-accent/45 bg-accent/[0.06] text-ink shadow-glow hover:border-accent/80 hover:bg-accent/[0.12] hover:shadow-glow-strong",
  ghost: "text-muted hover:bg-white/[0.04] hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.625rem]",
  md: "px-6 py-3.5 text-[0.6875rem]",
  lg: "px-8 py-4 text-xs",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Small diagonal arrow that nudges on hover. */
  withArrow?: boolean;
};

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function Button(props: ButtonProps) {
  const { variant = "outline", size = "md", className, children, withArrow, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
        {...anchorProps}
      >
        {children}
        {withArrow ? <Arrow /> : null}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}
