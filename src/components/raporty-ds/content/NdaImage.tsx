import { Frown } from "lucide-react"

/** Where the picture sits inside its frame, as percentages of the frame.
 *
 *  Only needed when the frame deliberately shows part of the image rather
 *  than all of it — a wide strip cropped from a tall diagram, or a small
 *  drawing floated in the middle of a wide band. Both come straight from the
 *  design, which positions those two images by hand instead of fitting them.
 *  Leave it off and the picture simply covers the frame. */
export interface NdaImageCrop {
  left: string
  top: string
  width: string
  height: string
}

export interface NdaImageProps {
  /** Path to the pre-blurred screenshot in public/. */
  src: string
  alt: string
  /** Badge copy - "Under NDA" / "Objęte NDA" - translates with the rest of the page. */
  label: string
  /** CSS aspect-ratio, e.g. "16/9". Falls back to the image's own ratio when omitted. */
  aspect?: string
  /** Hand-placed crop. Omit for the default cover fit. */
  crop?: NdaImageCrop
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
 *  Badge colour and the flat 20% opacity are what the design specifies. An
 *  earlier version stepped the opacity up to 40% over light screenshots,
 *  because a near-white badge vanished on them. That is gone with the
 *  screenshots that needed it: every picture on the page is now a pale
 *  diagram, so one value covers them all. */
export function NdaImage({ src, alt, label, aspect, crop, style }: NdaImageProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        // 16px and a hairline border are how this page frames a picture inside
        // a product card. The hairline stays neutral rather than tinted, so it
        // reads the same whatever accent the page around it happens to use.
        borderRadius: 16,
        border: "var(--pf-hairline)",
        boxSizing: "border-box",
        overflow: "hidden",
        background: "var(--pf-surface-card)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={
          crop
            ? { position: "absolute", left: crop.left, top: crop.top, width: crop.width, height: crop.height, maxWidth: "none", display: "block" }
            : { width: "100%", height: "100%", objectFit: "cover", display: "block" }
        }
      />
      {/* Opacity sits on the wrapper rather than on the icon and the label
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
        <Frown size={49} strokeWidth={1.5} color="var(--pf-text-muted)" aria-hidden />
        {/* Badge text is hidden from assistive technology: the image's alt text
            already conveys that it is blurred and redacted for NDA reasons, so
            repeating the badge label would announce the NDA context twice. */}
        <span
          aria-hidden
          style={{
            fontFamily: "var(--pf-font-display)",
            fontWeight: 600,
            fontSize: 24,
            lineHeight: "37px",
            color: "var(--pf-text-muted)",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
