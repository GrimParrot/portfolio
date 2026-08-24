import { Frown } from "lucide-react"

export interface NdaImageProps {
  /** Path to the pre-blurred screenshot in public/. */
  src: string
  alt: string
  /** Badge copy - "Under NDA" / "Objęte NDA" - translates with the rest of the page. */
  label: string
  /** CSS aspect-ratio, e.g. "16/9". Falls back to the image's own ratio when omitted. */
  aspect?: string
  style?: React.CSSProperties
}

/** A screenshot we may not show. The blur is baked into the exported file —
 *  a CSS filter would come off with one click in devtools, and the file in
 *  public/ is public. Only the badge is drawn here, so a row of these still
 *  reflows on a phone instead of being one wide baked-in image.
 *
 *  `label` comes from copy rather than being hardcoded: the badge is the one
 *  piece of text sitting on top of the artwork, and it translates with the
 *  rest of the page.
 *
 *  Badge colour is #E3E3E3 straight from Figma — it sits between
 *  --pf-primary-200 (#D4D4D4) and --pf-border (#E7E7E7) with no exact token
 *  match, so it stays a literal hex rather than drifting the design onto a
 *  near-match token. */
export function NdaImage({ src, alt, label, aspect, style }: NdaImageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--pf-primary-50)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* 20% opacity sits on the wrapper rather than on the icon and the label
          separately, so the two can never drift apart. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: 0.2,
        }}
      >
        <Frown size={49} strokeWidth={1.5} color="#E3E3E3" aria-hidden />
        {/* Badge text is hidden from assistive technology: the image's alt text
            already conveys that it is blurred and redacted for NDA reasons, so
            repeating the badge label would announce the NDA context twice. */}
        <span
          aria-hidden
          style={{
            fontFamily: "var(--pf-font-body)",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "26px",
            color: "#E3E3E3",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
