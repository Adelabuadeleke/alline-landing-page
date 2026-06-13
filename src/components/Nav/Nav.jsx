import React, { useState, useCallback } from 'react'
import styles from './Nav.module.css'

/* ── Inline logo SVG to avoid import issues ── */
const LogoNav = () => (
  <svg
    width="35"
    height="28"
    viewBox="0 0 35 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M33.7744 19.5038L29.5692 27.122C28.9574 28.2318 27.3754 28.2662 26.7143 27.1864L12.6069 4.13861C12.1347 3.36799 11.0077 3.39374 10.572 4.18369L2.97523 17.9454C2.7713 18.3168 2.77989 18.7676 3.00099 19.1303L6.7253 25.2137C7.19755 25.9844 8.32451 25.9586 8.76026 25.1687L14.4315 14.8887C14.8673 14.0966 15.9964 14.073 16.4665 14.8436L20.1736 20.8991C20.3947 21.2597 20.4055 21.7127 20.1994 22.084L17.6063 26.7829C17.192 27.5342 16.4021 28 15.5435 28H6.79614C5.64772 28 4.58302 27.4032 3.98412 26.4244L0.485193 20.7038C-0.133023 19.6927 -0.163075 18.4263 0.410062 17.3873L9.06722 1.70439C9.6468 0.652561 10.7544 0 11.9544 0H21.9403C23.0887 0 24.1534 0.596749 24.7523 1.57559L33.6971 16.1874C34.3175 17.1984 34.3454 18.4649 33.7722 19.5038H33.7744Z"
      fill="black"
    />
  </svg>
)

export default function Nav({ onWaitlistFocus }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setMenuOpen(v => !v), [])
  const closeMenu  = useCallback(() => setMenuOpen(false), [])

  const scrollToWaitlist = useCallback(() => {
    closeMenu()
    document.getElementById('waitlist-email')?.focus()
  }, [closeMenu])

  return (
    <>
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.inner}>

          {/* Left – desktop nav links */}
          <ul className={styles.links} role="list">
            <li><a href="#product">Product</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
          </ul>

          {/* Center – logo */}
          <a href="/" className={styles.logo} aria-label="Alline – home">
            <LogoNav />
          </a>

          {/* Right – desktop CTA */}
          <div className={styles.right}>
            <button
              className={styles.ctaBtn}
              onClick={scrollToWaitlist}
              aria-label="Join the waitlist"
            >
              Join the waitlist
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <a href="#product"  onClick={closeMenu}>Product</a>
        <a href="#features" onClick={closeMenu}>Features</a>
        <a href="#about"    onClick={closeMenu}>About</a>
        <a href="#waitlist" onClick={scrollToWaitlist}>Join the waitlist</a>
      </div>
    </>
  )
}
