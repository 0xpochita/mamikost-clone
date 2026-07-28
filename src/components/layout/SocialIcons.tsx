type SocialIconProps = {
  className?: string;
};

/** lucide-react v1 removed every brand icon for trademark reasons, and no
 * brand SVG was supplied for these three, so they are built here. Each shape
 * is constructed from primitives or a deliberately drawn path, then rendered
 * and inspected, rather than pasted from memory. */

export function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <title>Facebook</title>
      <path d="M12.6 24v-8.4h2.9l.43-3.36H12.6V10.1c0-.97.27-1.63 1.67-1.63h1.78V5.44A23.8 23.8 0 0 0 13.44 5.3c-2.57 0-4.32 1.56-4.32 4.44v2.5H6.24v3.36h2.88V24h3.48Z" />
      <circle
        cx="12"
        cy="12"
        fill="none"
        r="11.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function XIcon({ className }: SocialIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.6"
      viewBox="0 0 24 24"
    >
      <title>X</title>
      <path d="M4 4 L20 20" />
      <path d="M20 4 L4 20" />
    </svg>
  );
}

export function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <title>Instagram</title>
      <rect height="19" rx="5.5" width="19" x="2.5" y="2.5" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="17.8" cy="6.2" fill="currentColor" r="1.3" stroke="none" />
    </svg>
  );
}
