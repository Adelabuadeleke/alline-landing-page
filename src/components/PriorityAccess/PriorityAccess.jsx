import React, { useRef, useEffect, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './PriorityAccess.module.css'

gsap.registerPlugin(ScrollTrigger)

/* ── Inline wordmark SVG (7 paths, fill=currentColor) ── */
const Wordmark = () => (
  <svg
    className={styles.wordmarkSvg}
    viewBox="0 0 1131 242"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Alline"
    role="img"
  >
    <path d="M292.461 168.569L256.048 234.412C250.75 244.004 237.051 244.301 231.326 234.969L109.167 35.7694C105.077 29.109 95.3188 29.3316 91.5455 36.159L25.7633 155.1C23.9974 158.309 24.0718 162.205 25.9863 165.341L58.2362 217.919C62.3255 224.579 72.0841 224.356 75.8574 217.529L124.966 128.681C128.74 121.835 138.517 121.631 142.588 128.291L174.689 180.628C176.603 183.745 176.696 187.659 174.912 190.869L152.458 231.481C148.87 237.974 142.03 242 134.595 242H58.8496C48.9051 242 39.6855 236.842 34.4995 228.382L4.20141 178.94C-1.15188 170.201 -1.41211 159.255 3.55084 150.276L78.5155 14.7308C83.5342 5.63999 93.1255 0 103.516 0H189.987C199.931 0 209.151 5.15762 214.337 13.6176L291.792 139.905C297.164 148.643 297.405 159.589 292.443 168.569H292.461Z" fill="currentColor"/>
    <path d="M484.232 241.139H520.876C523.122 241.139 524.676 238.864 523.844 236.756L431.222 2.02498C430.75 0.804443 429.557 0 428.254 0H402.151C400.847 0 399.654 0.804443 399.183 2.02498L306.228 236.756C305.395 238.864 306.949 241.139 309.196 241.139H346.2C347.532 241.139 348.752 240.307 349.196 239.031L366.117 192.734C366.589 191.485 367.781 190.626 369.113 190.626H461.236C462.567 190.626 463.788 191.458 464.232 192.734L481.153 239.031C481.624 240.279 482.817 241.139 484.149 241.139H484.232ZM381.513 150.708L412.22 66.7134C413.246 63.9117 417.213 63.9117 418.24 66.7134L448.947 150.708C449.724 152.789 448.17 155.008 445.951 155.008H384.536C382.317 155.008 380.764 152.789 381.54 150.708H381.513Z" fill="currentColor"/>
    <path d="M588.393 241.138C577.325 241.138 568.087 237.726 560.709 230.93C553.33 224.133 549.641 213.232 549.641 198.252V3.2164C549.641 1.44108 551.083 0.0263672 552.831 0.0263672H584.842C586.617 0.0263672 588.032 1.46882 588.032 3.2164V190.624C588.032 195.922 589.225 199.778 591.666 202.219C594.079 204.633 597.269 205.853 601.181 205.853C603.261 205.853 605.397 205.631 607.588 205.16C609.78 204.716 612.027 204.133 614.329 203.44V233.759C614.329 235.09 613.525 236.311 612.276 236.783C608.532 238.197 604.731 239.251 600.848 239.945C596.243 240.749 592.082 241.138 588.393 241.138Z" fill="currentColor"/>
    <path d="M678.659 241.138C667.591 241.138 658.354 237.726 650.975 230.93C643.597 224.133 639.907 213.232 639.907 198.252V3.2164C639.907 1.44108 641.35 0.0263672 643.097 0.0263672H675.109C676.884 0.0263672 678.299 1.46882 678.299 3.2164V190.624C678.299 195.922 679.491 199.778 681.932 202.219C684.346 204.633 687.536 205.853 691.447 205.853C693.528 205.853 695.663 205.631 697.855 205.16C700.046 204.716 702.293 204.133 704.596 203.44V233.759C704.596 235.09 703.791 236.311 702.543 236.783C698.798 238.197 694.998 239.251 691.114 239.945C686.509 240.749 682.349 241.138 678.659 241.138Z" fill="currentColor"/>
    <path d="M768.728 0H733.361C731.557 0 730.115 1.49793 730.17 3.301L731.807 61.9422V237.949C731.807 239.724 733.25 241.139 734.997 241.139H766.981C768.756 241.139 770.171 239.697 770.171 237.949V63.246C770.171 61.4706 768.728 60.0559 766.981 60.0559H741.072C739.963 60.0559 739.657 58.5302 740.656 58.0864L770.004 45.2985C771.169 44.7992 771.918 43.6342 771.918 42.3581V3.19004C771.918 1.41471 770.476 0 768.728 0Z" fill="currentColor"/>
    <path d="M931.559 83.8837C920.824 72.9266 905.9 67.4619 886.76 67.4619C878.216 67.4619 870.089 68.9598 862.377 71.9557C854.638 74.9516 847.897 79.5563 842.127 85.7977C839.797 88.2942 837.772 91.1791 835.914 94.286V73.7865C835.914 72.0112 834.471 70.5965 832.724 70.5965H800.712C798.937 70.5965 797.522 72.0389 797.522 73.7865V237.949C797.522 239.724 798.965 241.139 800.712 241.139H832.724C834.499 241.139 835.914 239.696 835.914 237.949V158.114C835.914 144.966 837.412 134.12 840.408 125.604C843.403 117.088 847.842 110.791 853.723 106.741C859.603 102.691 866.816 100.694 875.359 100.694C886.899 100.694 895.415 104.272 900.963 111.429C906.511 118.586 909.257 129.765 909.257 144.994V237.976C909.257 239.752 910.699 241.166 912.447 241.166H944.458C946.234 241.166 947.648 239.724 947.648 237.976V130.819C947.648 110.514 942.295 94.8962 931.559 83.9391V83.8837Z" fill="currentColor"/>
    <path d="M1126.29 116.948C1123.18 106.795 1118.38 97.7519 1111.92 89.7907C1105.46 81.8295 1097.33 75.6158 1087.54 71.122C1077.72 66.6282 1066.26 64.3813 1053.11 64.3813C1039.27 64.3813 1027.29 66.8502 1017.13 71.8155C1006.98 76.7809 998.688 83.5216 992.225 92.0653C985.761 100.609 980.99 110.235 977.856 120.942C974.721 131.65 973.195 142.69 973.195 153.98C973.195 165.27 974.804 176.171 978.05 186.657C981.267 197.142 986.233 206.546 992.918 214.84C999.603 223.134 1008.2 229.598 1018.69 234.202C1029.17 238.807 1041.57 241.109 1055.89 241.109C1065.57 241.109 1074.28 240.194 1082.02 238.335C1089.73 236.505 1097.16 233.62 1104.32 229.681C1110.67 226.186 1117.02 221.719 1123.38 216.227C1124.71 215.09 1124.87 213.037 1123.77 211.706L1106.82 191.123C1105.65 189.708 1103.54 189.625 1102.18 190.873C1096.39 196.144 1090.06 200.083 1083.21 202.69C1075.36 205.686 1066.73 207.184 1057.27 207.184C1044.35 207.184 1033.75 203.606 1025.46 196.449C1017.88 189.93 1013.39 180.748 1011.95 168.876C1011.73 166.99 1013.28 165.325 1015.17 165.325H1127.09C1128.7 165.325 1130.12 164.132 1130.31 162.524C1130.56 160.471 1130.7 158.39 1130.78 156.338C1130.89 153.342 1130.95 151.039 1130.95 149.43C1130.95 137.891 1129.4 127.072 1126.29 116.92V116.948ZM1014.58 137.003C1012.64 137.003 1011.09 135.283 1011.39 133.369C1012.34 127.6 1014.19 122.163 1016.97 117.114C1020.32 111.011 1025.04 105.991 1031.17 102.052C1037.27 98.1403 1044.85 96.1708 1053.83 96.1708C1060.3 96.1708 1066.07 97.2803 1071.14 99.444C1076.22 101.635 1080.49 104.52 1083.93 108.099C1087.4 111.677 1089.98 115.783 1091.73 120.387C1093.33 124.659 1094.19 129.125 1094.31 133.785L1091.06 137.003H1014.61H1014.58Z" fill="currentColor"/>
  </svg>
)

/* ── Decorative background grid (architectural brackets) ── */
const BackgroundGrid = () => (
  <svg
    className={styles.bgGrid}
    viewBox="0 0 1512 478"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
  >
    <path d="M1346 167H1341V99H1269V54H1195V88H1111V83H1190V49H1269V29H1274V94H1353V99H1346V167Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M166 167H171V99H243V54H317V88H401V83H322V49H243V29H238V94H159V99H166V167Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M991 295H986V227H914V182H840V216H756V211H835V177H914V157H919V222H998V227H991V295Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1346 406H1341V338H1269V293H1195V327H1111V322H1190V288H1269V268H1274V333H1353V338H1346V406Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M166 406H171V338H243V293H317V327H401V322H322V288H243V268H238V333H159V338H166V406Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M734 377H739V309H811V264H885V298H969V293H890V259H811V239H806V304H727V309H734V377Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1387 65H1466V133H1461V70H1382V0H1387V65Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M125 65H46V133H51V70H130V0H125V65Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1387 304H1466V372H1461V309H1382V239H1387V304Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M125 304H46V372H51V309H130V239H125V304Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1083 65H1004V133H1009V70H1088V0H1083V65Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M429 65H508V133H503V70H424V0H429V65Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M578 65H657V133H652V70H573V0H578V65Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1083 304H1004V372H1009V309H1088V239H1083V304Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M429 304H508V372H503V309H424V239H429V304Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M578 304H657V372H652V309H573V239H578V304Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1512 176H1433V239H1428V171H1507V106H1512V176Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M0 176H79V239H84V171H5V106H0V176Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1512 415H1433V478H1428V410H1507V345H1512V415Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M0 415H79V478H84V410H5V345H0V415Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M958 176H1037V239H1042V171H963V106H958V176Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M554 176H475V239H470V171H549V106H554V176Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M703 176H624V239H619V171H698V106H703V176Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M958 415H1037V478H1042V410H963V345H958V415Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M554 415H475V478H470V410H549V345H554V415Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M703 415H624V478H619V410H698V345H703V415Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1187 191H1107V123H1112V186H1192V226H1309V191H1228V160H1233V186H1309V123H1314V231H1187V191Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M325 191H405V123H400V186H320V226H203V191H284V160H279V186H203V123H198V231H325V191Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M854 66H934V-2H929V61H849V101H732V66H813V35H808V61H732V-2H727V106H854V66Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M1187 430H1107V362H1112V425H1192V465H1309V430H1228V399H1233V425H1309V362H1314V470H1187V430Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M845 458H925V391H945V386H877V323H872V386H861V391H920V453H845V425H840V434H753V399H804V331H799V394H718V399H748V434H719V439H840V470H845V458Z" fill="none" stroke="currentColor" strokeWidth="1"/>
    <path d="M325 456.296H405V382H400V450.833H320V494.537H203V456.296H284V422.426H279V450.833H203V382H198V500H325V456.296Z" fill="none" stroke="currentColor" strokeWidth="1"/>
  </svg>
)

export default function PriorityAccess() {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const subRef      = useRef(null)
  const formRef     = useRef(null)
  const linksRef    = useRef(null)
  const wordmarkRef = useRef(null)

  const [submitted, setSubmitted] = useState(false)

  /* ── Scroll-triggered entrance animations ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(
          [headingRef.current, subRef.current, formRef.current,
           linksRef.current, wordmarkRef.current],
          { opacity: 1, y: 0 }
        )
        return
      }

      const els = [
        headingRef.current,
        subRef.current,
        formRef.current,
        linksRef.current,
      ].filter(Boolean)

      els.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        )
      })

      /* Wordmark slides up from below */
      if (wordmarkRef.current) {
        gsap.fromTo(wordmarkRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const email = e.target.elements.email.value
    /* TODO: wire to your backend / Mailchimp */
    console.log('Priority waitlist:', email)
    setSubmitted(true)
  }, [])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="priority-access"
      aria-label="Get priority access"
    >
      {/* Decorative background grid — fills entire section */}
      <div className={styles.bgGridWrapper} aria-hidden="true">
        <BackgroundGrid />
      </div>

      {/* Main content */}
      <div className={styles.inner}>

        <div className={styles.textBlock}>
          <h2 ref={headingRef} className={styles.heading}>
            Get priority access before
            <br />
            we open to the public.
          </h2>

          <p ref={subRef} className={styles.sub}>
            Early members shape the product — and get the best seat at the table.
          </p>

          {/* Waitlist form */}
          <form
            ref={formRef}
            className={styles.form}
            onSubmit={handleSubmit}
            aria-label="Priority access waitlist"
            noValidate
          >
            {submitted ? (
              <p className={styles.successMsg} role="status" aria-live="polite">
                You're on the list — we'll be in touch.
              </p>
            ) : (
              <>
                <label htmlFor="priority-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="priority-email"
                  name="email"
                  className={styles.emailInput}
                  placeholder="Email address"
                  required
                  autoComplete="email"
                />
                <button type="submit" className={styles.submitBtn}>
                  Join the waitlist
                </button>
              </>
            )}
          </form>
        </div>

        {/* Social / contact links */}
        <nav
          ref={linksRef}
          className={styles.links}
          aria-label="Social links"
        >
          <a
            href="https://linkedin.com"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          {/* <span className={styles.linkDivider} aria-hidden="true" /> */}
          <a
            href="https://instagram.com"
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          {/* <span className={styles.linkDivider} aria-hidden="true" /> */}
          <a
            href="mailto:hello@alline.ai"
            className={styles.link}
          >
            Get in touch
          </a>
        </nav>

      </div>

      {/* Large wordmark at bottom */}
      <div ref={wordmarkRef} className={styles.wordmarkWrapper} aria-label="Alline">
        <Wordmark />
      </div>

    </section>
  )
}