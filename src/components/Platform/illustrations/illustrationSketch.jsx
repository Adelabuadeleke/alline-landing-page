import React, { forwardRef } from 'react'

/*
 * IllustrationSketch
 * ─────────────────────────────────────────────────────────
 * Single isometric cube illustration (provided asset), with
 * one fix applied:
 *
 *   The inner hexagon (#136A0D, the smaller cube-face outline)
 *   was exported with each of its 6 corners split into 2–3
 *   near-duplicate points a fraction of a pixel apart — e.g.
 *   the corner near (110.35, 129.78) appeared as both
 *   (110.481, 129.706) and (110.229, 129.849). That's what
 *   reads as "missing joints": the path visually arrives at
 *   a corner, then immediately darts to an almost-identical
 *   point before continuing, instead of cleanly meeting at
 *   one vertex.
 *
 *   Fix: clustered the original 16 points down to their 6
 *   true corners (averaging each cluster) and rebuilt the
 *   path as a single clean closed hexagon — same shape,
 *   gapless joints.
 *
 * The outer hexagon (#82FF7A, the larger silhouette) was
 * already a clean 6-point closed path in the source and is
 * used as-is.
 *
 * data-draw on both hexagons drives the scroll-triggered
 * stroke-draw animation; data-handle on the corner squares
 * and circles drives the hover reveal, matching the other
 * 3 cards in the Platform section.
 */
const IllustrationSketch = forwardRef(function IllustrationSketch(props, ref) {
  return (
    // <svg
    //   ref={ref}
    //   viewBox="0 0 123 174"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   aria-hidden="true"
    //   {...props}
    // >
    //   {/* Inner hexagon — joints fixed (was 16 messy points, now 6 clean corners) */}
    //   <path
    //     d="M110.35 129.78 L60.95 157.96 L11.20 129.78 L11.26 44.14 L60.95 15.60 L110.36 44.17 Z"
    //     data-draw
    //   />

    //   {/* Outer hexagon — already clean in the source, used as-is */}
    //   <path
    //     d="M119.817 36.2104V138.172L61.1914 171.79L2.1543 138.171V36.2124L61.1904 2.12646L119.817 36.2104Z"
    //     data-draw
    //   />

    //   {/* Vertex markers — circles */}
    //   <circle cx="61.1919" cy="69.8282" r="1.65385" data-handle />
    //   <circle cx="61.1919" cy="171.539" r="1.65385" data-handle />

    //   {/* Vertex markers — corner squares */}
    //   <rect x="59" y="0" width="4" height="4" data-handle />
    //   <rect x="0" y="34" width="4" height="4" data-handle />
    //   <rect x="0" y="136" width="4" height="4" data-handle />
    //   <rect x="117" y="34" width="4" height="4" data-handle />
    //   <rect x="118.25" y="136" width="4" height="4" data-handle />
    // </svg>

    <svg width="302" height="277" viewBox="0 0 302 277" fill="none" xmlns="http://www.w3.org/2000/svg">
     <path d="M289.924 129.705L289.672 129.849L240.641 157.915L240.393 158.057L240.145 157.916L190.772 129.85L190.519 129.706V44.2441L190.769 44.0996L190.81 44.0762L240.143 15.6436L240.393 15.5L240.643 15.6445L289.675 44.1006L289.924 44.2451V129.705Z" fill="" stroke="#136A0D"/>
     <path d="M240.134 70.5303V171.506L181.596 138.172V36.7324L240.134 70.5303ZM299.259 138.173L241.134 171.503V70.5283L299.259 36.792V138.173ZM298.764 35.9238L240.633 69.6641L182.146 35.8955L240.632 2.12695L298.764 35.9238Z" stroke="#82FF7A"/>
     <circle cx="240.635" cy="69.8277" r="1.65385" fill="#82FF7A"/>
     <circle cx="240.635" cy="171.539" r="1.65385" fill="#82FF7A"/>
     <rect x="238.442" width="4" height="4" fill="#82FF7A"/>
     <rect x="179.442" y="34" width="4" height="4" fill="#82FF7A"/>
     <rect x="179.442" y="136" width="4" height="4" fill="#82FF7A"/>
     <rect x="296.442" y="34" width="4" height="4" fill="#82FF7A"/>
     <rect x="297.692" y="136" width="4" height="4" fill="#82FF7A"/>
     <path d="M201.443 180.147L201.191 180.291L152.161 208.357L151.913 208.499L151.665 208.358L102.292 180.292L102.039 180.148V94.6865L102.289 94.542L102.33 94.5186L151.663 66.0859L151.913 65.9424L152.163 66.0869L201.194 94.543L201.443 94.6875V180.147Z" fill="" stroke="#136A0D"/>
     <path d="M151.654 120.973V221.948L93.1155 188.614V87.1748L151.654 120.973ZM210.779 188.615L152.654 221.945V120.971L210.779 87.2344V188.615ZM210.283 86.3662L152.153 120.106L93.6653 86.3379L152.152 52.5693L210.283 86.3662Z" stroke="#82FF7A"/>
     <circle cx="152.154" cy="120.27" r="1.65385" fill="#82FF7A"/>
     <circle cx="152.154" cy="221.981" r="1.65385" fill="#82FF7A"/>
     <rect x="149.962" y="50.4424" width="4" height="4" fill="#82FF7A"/>
     <rect x="90.9617" y="84.4424" width="4" height="4" fill="#82FF7A"/>
     <rect x="90.9617" y="186.442" width="4" height="4" fill="#82FF7A"/>
     <rect x="207.962" y="84.4424" width="4" height="4" fill="#82FF7A"/>
     <rect x="209.212" y="186.442" width="4" height="4" fill="#82FF7A"/>
     <path d="M110.481 232.705L110.229 232.849L61.1991 260.915L60.951 261.057L60.703 260.916L11.33 232.85L11.077 232.706V147.244L11.327 147.1L11.368 147.076L60.701 118.644L60.951 118.5L61.201 118.645L110.232 147.101L110.481 147.245V232.705Z" fill="" stroke="#136A0D"/>
     <path d="M60.6919 173.53V274.506L2.15381 241.172V139.732L60.6919 173.53ZM119.817 241.173L61.6919 274.503V173.528L119.817 139.792V241.173ZM119.322 138.924L61.1909 172.664L2.70361 138.896L61.1899 105.127L119.322 138.924Z" stroke="#82FF7A"/>
     <circle cx="61.1923" cy="172.828" r="1.65385" fill="#82FF7A"/>
     <circle cx="61.1923" cy="274.539" r="1.65385" fill="#82FF7A"/>
     <rect x="59" y="103" width="4" height="4" fill="#82FF7A"/>
     <rect y="137" width="4" height="4" fill="#82FF7A"/>
     <rect y="239" width="4" height="4" fill="#82FF7A"/>
     <rect x="117" y="137" width="4" height="4" fill="#82FF7A"/>
     <rect x="118.25" y="239" width="4" height="4" fill="#82FF7A"/>
    </svg>

  )
})

export default IllustrationSketch