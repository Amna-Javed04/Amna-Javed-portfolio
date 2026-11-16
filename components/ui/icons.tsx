import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconCode(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8.5 7-5 5 5 5" />
      <path d="m15.5 7 5 5-5 5" />
      <path d="M13.5 4.5 10.5 19.5" />
    </Icon>
  );
}

export function IconBrain(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4.8a3 3 0 0 0-3 2.9 3 3 0 0 0-1.6 5.5A3 3 0 0 0 9.5 19H12V4.8Z" />
      <path d="M12 4.8a3 3 0 0 1 3 2.9 3 3 0 0 1 1.6 5.5A3 3 0 0 1 14.5 19H12V4.8Z" />
      <path d="M7.5 9.9c.9 0 1.4.6 1.4 1.4M16.5 9.9c-.9 0-1.4.6-1.4 1.4M9 15c.6 0 1 .4 1 1M15 15c-.6 0-1 .4-1 1" />
    </Icon>
  );
}

export function IconTrophy(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5.5H5.5V7a3 3 0 0 0 3 3M16 5.5h2.5V7a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 20h6M10 17h4" />
    </Icon>
  );
}

export function IconBulb(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 18h5M10.5 21h3" />
      <path d="M12 3a6 6 0 0 0-3.7 10.7c.6.5 1 1.2 1.1 1.9l.1 1h5l.1-1c.1-.7.5-1.4 1.1-1.9A6 6 0 0 0 12 3Z" />
      <path d="M12 7v3" />
    </Icon>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h10" />
    </Icon>
  );
}

export function IconClose(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Icon>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v10M8 10.5l4 4 4-4" />
      <path d="M5 18.5h14" />
    </Icon>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </Icon>
  );
}

export function IconGithub(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </Icon>
  );
}

export function IconLinkedin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

export function IconKaggle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 4v16" />
      <path d="M19 4 7 12l12 8" />
    </Icon>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Icon>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </Icon>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5Z" />
      <path d="M18.5 16.5c.3 1.7 1.2 2.6 2.9 2.9-1.7.3-2.6 1.2-2.9 2.9-.3-1.7-1.2-2.6-2.9-2.9 1.7-.3 2.6-1.2 2.9-2.9Z" />
    </Icon>
  );
}
