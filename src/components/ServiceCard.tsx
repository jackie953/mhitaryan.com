import Link from "next/link";

interface ServiceCardProps {
  href: string;
  video: string;
  label: string;
  heading: string;
}

export function ServiceCard({ href, video, label, heading }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block no-underline transition-shadow duration-300 ease-out hover:shadow-xl"
      style={{
        borderRadius: "var(--radius-l)",
        overflow: "hidden",
        background: "#FFFFFF",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "16 / 9", overflow: "hidden" }}>
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            border: "none",
            outline: "none",
          }}
        />
      </div>
      <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
        <span
          style={{
            display: "block",
            color: "#5D3285",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.5rem",
            marginTop: "0.5rem",
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--neutral-on-background-strong)",
          }}
        >
          {heading}
          <span
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            style={{ display: "inline-block" }}
            aria-hidden="true"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
