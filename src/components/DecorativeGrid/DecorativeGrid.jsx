import React, { forwardRef } from 'react'
import styles from './DecorativeGrid.module.css'


const DecorativeGrid = forwardRef(function DecorativeGrid(props, ref) {
  return (
    <svg
      ref={ref}
      className={styles.planSvg}
      viewBox="0 0 1512 478"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      {/* Section 0 — grid cell (0,0) */}
      <g className={styles.section} data-section="0">
        <path d="M166 167H171V99H243V54H317V88H401V83H322V49H243V29H238V94H159V99H166V167Z" className={styles.line}/>
        <path d="M125 65H46V133H51V70H130V0H125V65Z" className={styles.line}/>
        <path d="M0 176H79V239H84V171H5V106H0V176Z" className={styles.line}/>
        <path d="M325 191H405V123H400V186H320V226H203V191H284V160H279V186H203V123H198V231H325V191Z" className={styles.line}/>
        <rect x="0" y="0" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 1 — grid cell (1,0) */}
      <g className={styles.section} data-section="1">
        <path d="M429 65H508V133H503V70H424V0H429V65Z" className={styles.line}/>
        <path d="M578 65H657V133H652V70H573V0H578V65Z" className={styles.line}/>
        <path d="M554 176H475V239H470V171H549V106H554V176Z" className={styles.line}/>
        <path d="M703 176H624V239H619V171H698V106H703V176Z" className={styles.line}/>
        <rect x="378" y="0" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 2 — grid cell (2,0) */}
      <g className={styles.section} data-section="2">
        <path d="M991 295H986V227H914V182H840V216H756V211H835V177H914V157H919V222H998V227H991V295Z" className={styles.line}/>
        <path d="M1083 65H1004V133H1009V70H1088V0H1083V65Z" className={styles.line}/>
        <path d="M958 176H1037V239H1042V171H963V106H958V176Z" className={styles.line}/>
        <path d="M854 66H934V-2H929V61H849V101H732V66H813V35H808V61H732V-2H727V106H854V66Z" className={styles.line}/>
        <rect x="756" y="0" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 3 — grid cell (3,0) */}
      <g className={styles.section} data-section="3">
        <path d="M1346 167H1341V99H1269V54H1195V88H1111V83H1190V49H1269V29H1274V94H1353V99H1346V167Z" className={styles.line}/>
        <path d="M1387 65H1466V133H1461V70H1382V0H1387V65Z" className={styles.line}/>
        <path d="M1512 176H1433V239H1428V171H1507V106H1512V176Z" className={styles.line}/>
        <path d="M1187 191H1107V123H1112V186H1192V226H1309V191H1228V160H1233V186H1309V123H1314V231H1187V191Z" className={styles.line}/>
        <rect x="1134" y="0" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 4 — grid cell (0,1) */}
      <g className={styles.section} data-section="4">
        <path d="M166 406H171V338H243V293H317V327H401V322H322V288H243V268H238V333H159V338H166V406Z" className={styles.line}/>
        <path d="M125 304H46V372H51V309H130V239H125V304Z" className={styles.line}/>
        <path d="M0 415H79V478H84V410H5V345H0V415Z" className={styles.line}/>
        <path d="M325 456.296H405V382H400V450.833H320V494.537H203V456.296H284V422.426H279V450.833H203V382H198V500H325V456.296Z" className={styles.line}/>
        <rect x="0" y="239" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 5 — grid cell (1,1) */}
      <g className={styles.section} data-section="5">
        <path d="M429 304H508V372H503V309H424V239H429V304Z" className={styles.line}/>
        <path d="M578 304H657V372H652V309H573V239H578V304Z" className={styles.line}/>
        <path d="M554 415H475V478H470V410H549V345H554V415Z" className={styles.line}/>
        <path d="M703 415H624V478H619V410H698V345H703V415Z" className={styles.line}/>
        <rect x="378" y="239" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 6 — grid cell (2,1) */}
      <g className={styles.section} data-section="6">
        <path d="M734 377H739V309H811V264H885V298H969V293H890V259H811V239H806V304H727V309H734V377Z" className={styles.line}/>
        <path d="M1083 304H1004V372H1009V309H1088V239H1083V304Z" className={styles.line}/>
        <path d="M958 415H1037V478H1042V410H963V345H958V415Z" className={styles.line}/>
        <path d="M845 458H925V391H945V386H877V323H872V386H861V391H920V453H845V425H840V434H753V399H804V331H799V394H718V399H748V434H719V439H840V470H845V458Z" className={styles.line}/>
        <rect x="756" y="239" width="378" height="239" className={styles.hoverZone}/>
      </g>

      {/* Section 7 — grid cell (3,1) */}
      <g className={styles.section} data-section="7">
        <path d="M1346 406H1341V338H1269V293H1195V327H1111V322H1190V288H1269V268H1274V333H1353V338H1346V406Z" className={styles.line}/>
        <path d="M1387 304H1466V372H1461V309H1382V239H1387V304Z" className={styles.line}/>
        <path d="M1512 415H1433V478H1428V410H1507V345H1512V415Z" className={styles.line}/>
        <path d="M1187 430H1107V362H1112V425H1192V465H1309V430H1228V399H1233V425H1309V362H1314V470H1187V430Z" className={styles.line}/>
        <rect x="1134" y="239" width="378" height="239" className={styles.hoverZone}/>
      </g>
    </svg>
  )
})

export default DecorativeGrid