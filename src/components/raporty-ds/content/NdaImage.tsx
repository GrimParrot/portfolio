import { Frown } from "lucide-react"

/** A screenshot we may not show. The blur is baked into the exported file —
 *  a CSS filter would come off with one click in devtools, and the file in
 *  public/ is public. Only the badge is drawn here, so a row of these still
 *  reflows on a phone instead of being one wide baked-in image.
 *
 *  `label` comes from copy rather than being hardcoded: the badge is the one
 *  piece of text sitting on top of the artwork, and it translates with the
 *  rest of the page. */
export function NdaImage({
  src,
  alt,
  label,
  aspect,
}: {
  src: string
  alt: string
  label: string
  aspect?: string
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 12,
        overflow: "hidden",
        background: "#F5F5F5",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Frown size={49} strokeWidth={1.5} color="#E3E3E3" aria-hidden />
        <span
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
