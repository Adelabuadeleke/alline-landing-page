import React, { forwardRef } from 'react'
import styles from './FloorPlan.module.css'

/*
 * FloorPlan
 * ─────────────────────────────────────────────────────────
 * Inline SVG floor-plan illustration (64 shapes: 1 building
 * shell path + 63 interior detail rects/paths).
 *
 * The shell path is placed FIRST in document order so the
 * "draw-on" animation reveals the building outline before
 * the interior furniture/grid details.
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
        <path d="M108.907 718.913V727.721H163.962V745.339H91.2896V718.913H108.907ZM245.443 727.721V745.339H214.612V727.721H245.443ZM313.71 727.721V745.339H289.486V727.721H313.71ZM384.18 727.721V745.339H359.956V727.721H384.18ZM511.907 727.721V745.339H472.268V727.721H511.907ZM622.016 727.721V745.339H584.579V727.721H622.016ZM723.317 727.721V745.339H690.284V727.721H723.317ZM807 1V745.339H765.159V727.721H789.383V652.847H754.148V635.23H789.383V542.738H714.508V571.366H696.891V507.503H714.508V525.12H789.383V456.852H714.508V481.077H696.891V418.314H714.508V439.235H789.383V362.158H714.508V388.585H696.891V321.418H714.508V344.541H789.383V271.869H714.508V289.486H696.891V241.038H714.508V254.251H789.383V152.951H714.508V203.601H696.891V128.727H714.508V135.333H789.383V18.6175H714.508V23.0219H696.891V18.6175H641.836V135.333H657.251V152.951H655.049V476.672H639.634V498.694H622.016V459.055H637.432V152.951H622.016V135.333H624.219V18.6175H254.251V135.333H258.656V152.951H234.432V459.055H247.645V498.694H230.027V476.672H216.814V152.951H214.612V135.333H236.634V18.6175H155.153V135.333H163.962V152.951H113.311V135.333H137.536V18.6175H18.6175V135.333H45.0437V152.951H18.6175V269.667H38.4372V287.284H1V1H807ZM108.907 630.825V657.251H91.2896V630.825H108.907ZM714.508 626.421V635.23H723.317V652.847H696.891V626.421H714.508ZM155.153 430.426V467.863H108.907V562.557H91.2896V450.246H137.536V430.426H155.153ZM155.153 362.158V388.585H137.536V362.158H155.153ZM155.153 269.667V315.913H137.536V287.284H122.12V269.667H155.153ZM487.683 135.333V152.951H406.202V135.333H487.683ZM203.601 49.4481V100.098H185.984V49.4481H203.601ZM714.508 53.8525V97.8962H696.891V53.8525H714.508Z" stroke="currentColor" stroke-width="2"/>
        <path d="M627.623 526.121V541.738H237.634V526.121H627.623Z" stroke="currentColor" stroke-width="2"/>
        <path d="M770.766 728.721V744.338H151.749V728.721H770.766Z" stroke="currentColor" stroke-width="2"/>
        <path d="M136.536 270.667V286.284H32.8311V270.667H136.536Z" stroke="currentColor" stroke-width="2"/>
        <path d="M629.825 138.536V149.749H244.24V138.536H629.825Z" stroke="currentColor" stroke-width="2"/>
        <path d="M136.536 138.536V149.749H32.8311V138.536H136.536Z" stroke="currentColor" stroke-width="2"/>
        <path d="M713.509 629.826L697.892 629.826L697.892 19.6177L713.509 19.6177L713.509 629.826Z" stroke="currentColor" stroke-width="2"/>
        <path d="M154.153 453.65L138.536 453.65L138.536 147.344L154.153 147.344L154.153 453.65Z" stroke="currentColor" stroke-width="2"/>
        <path d="M110.109 726.722L94.4922 726.722L94.4922 561.355L110.109 561.355L110.109 726.722Z" stroke="currentColor" stroke-width="2"/>
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
        <path d="M794.989 393.989V418.415H739.732V393.989H794.989Z" stroke="currentColor" stroke-width="2"/>
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
        <path d="M794.989 455.65V506.502H766.158V455.65H794.989Z" stroke="currentColor" stroke-width="2"/>
        <path d="M237.837 50.4487V96.897H151.749V50.4487H237.837Z" stroke="currentColor" stroke-width="2"/>
    </svg>
  )
})

export default FloorPlan