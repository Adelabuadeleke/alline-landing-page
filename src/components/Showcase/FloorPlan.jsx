import React, { forwardRef } from 'react'
import styles from './FloorPlan.module.css'

/*
 * FloorPlan
 * ─────────────────────────────────────────────────────────
 * Inline SVG floor-plan illustration — 70 shapes total:
 *
 *   • 16 shapes traced directly from the design reference
 *     (Group_19.png) via contour detection — this is the
 *     building shell, room partitions, doors/windows and
 *     all wall detail, pixel-accurate to the design.
 *     The largest (the full shell + partitions, 202 points)
 *     is FIRST so the draw-on animation reveals the building
 *     outline before interior details.
 *
 *   • 52 seating-grid rects + 2 AV-screen paths carried over
 *     from the original vector source — these represent
 *     furniture/AV equipment not present in the wall-only
 *     PNG reference, so they're appended after the shell.
 *
 * stroke="currentColor" — controlled via CSS `color` on .planSvg
 * fill="none" — pure line-drawing aesthetic
 *
 * stroke-dasharray / stroke-dashoffset are set programmatically
 * via useShowcaseAnimation (getTotalLength() per shape), then
 * animated to 0 with a stagger as the user scrolls.
 */
const FloorPlan = forwardRef(function FloorPlan(props, ref) {
  return (
    <svg
      ref={ref}
      className={styles.planSvg}
      viewBox="0 0 808 747"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Architectural floor plan illustration"
      role="img"
    >
        <path d="M2 2L2 285L36 285L36 271L18 271L17 270L17 152L18 151L43 151L43 136L18 136L17 135L17 18L18 17L137 17L139 20L138 21L139 22L138 23L138 135L137 136L114 136L114 151L162 151L162 136L154 136L153 135L153 18L154 17L237 17L238 18L238 135L237 136L216 136L216 151L218 152L218 475L230 475L231 476L231 497L245 497L246 496L246 460L233 460L232 459L232 152L233 151L257 151L257 137L252 135L252 18L253 17L624 17L625 18L625 135L623 136L623 151L637 151L638 152L638 459L637 460L623 460L623 497L637 497L638 496L638 476L639 475L653 475L653 152L655 151L655 136L641 136L640 135L640 18L641 17L697 17L698 18L698 21L713 21L712 20L713 19L712 18L713 17L789 17L790 18L790 135L789 136L713 136L712 135L713 134L712 133L713 132L712 131L713 130L698 130L698 202L712 202L713 201L712 200L713 199L713 152L714 151L789 151L790 152L790 254L789 255L713 255L712 254L713 253L712 252L713 251L712 249L713 248L712 242L698 242L698 287L699 288L701 287L702 288L711 288L713 287L713 272L712 271L713 270L789 270L790 271L790 345L789 346L788 345L787 346L786 345L716 345L715 346L712 344L713 343L713 327L712 326L713 325L712 324L713 323L712 322L698 322L698 387L712 387L713 386L712 385L713 384L713 367L712 366L713 364L712 362L714 360L789 360L790 361L790 439L789 440L714 440L713 439L713 422L712 421L713 420L712 419L698 419L698 479L713 479L713 456L714 455L789 455L790 456L790 525L789 526L714 526L712 524L713 523L712 522L713 520L713 511L712 510L713 509L712 508L711 509L701 509L700 508L698 509L698 569L713 569L713 542L714 541L789 541L790 542L790 635L789 636L755 636L755 651L789 651L790 652L790 728L789 729L766 729L766 743L805 743L805 2Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M153 431L139 431L138 432L138 450L137 451L92 451L92 560L94 561L105 561L107 560L107 467L108 466L153 466Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M407 136L407 151L486 151L486 137L485 136Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M92 720L92 743L162 743L162 729L108 729L107 728L107 720Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M123 271L123 285L137 285L139 287L138 288L138 313L139 314L153 314L153 271Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M189 50L187 51L187 98L202 98L202 51L201 50Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M698 55L698 96L712 96L713 95L713 56L712 55Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M473 729L473 743L510 743L510 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M698 627L698 651L721 651L721 636L714 636L712 633L713 632L713 630L712 629L713 628L712 627Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M586 729L586 743L620 743L620 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M691 729L691 743L721 743L721 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M216 729L216 743L244 743L244 736L243 735L244 734L243 733L244 732L243 731L244 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M139 363L139 365L138 366L138 383L139 384L138 386L139 387L153 387L153 363Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M92 632L92 655L107 655L107 632Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M290 729L291 730L290 731L291 733L290 735L290 743L312 743L312 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <path d="M361 729L361 743L382 743L382 729Z" fill="none" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="200.197" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="200.197" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="200.197" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="217.814" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="217.814" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="217.814" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="235.432" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="235.432" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="235.432" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="253.049" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="253.049" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="253.049" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="270.667" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="270.667" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="270.667" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="288.285" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="288.285" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="288.285" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="305.902" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="305.902" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="305.902" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="323.52" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="323.52" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="323.52" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="341.137" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="341.137" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="341.137" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="358.754" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="358.754" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="358.754" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="376.373" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="376.373" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="376.373" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="393.989" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="393.989" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="393.989" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="411.607" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="411.607" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="411.607" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="429.223" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="429.223" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="429.223" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="446.842" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="446.842" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="446.842" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="464.46" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="228.825" y="464.46" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="464.46" width="46.4481" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="482.076" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="237.634" y="482.076" width="37.6393" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="598.792" y="482.076" width="28.8306" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <rect x="286.082" y="499.694" width="301.902" height="11.2131" stroke="currentColor" stroke-width="2"/>
        <path d="M794.989 393.989V418.415H739.732V393.989H794.989Z" stroke="currentColor" stroke-width="2"/>
        <path d="M794.989 455.65V506.502H766.158V455.65H794.989Z" stroke="currentColor" stroke-width="2"/>
    </svg>
  )
})

export default FloorPlan