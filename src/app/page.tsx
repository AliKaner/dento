import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>DENTO<span className="text-gradient">.AI</span></div>
        <nav className={styles.nav}>
          <a href="#" className={styles.navLink}>Platform</a>
          <a href="#" className={styles.navLink}>Solutions</a>
          <a href="#" className={styles.navLink}>Testimonials</a>
          <a href="#" className={styles.navLink}>Pricing</a>
        </nav>
        <button className={styles.ctaButton}>Book Demo</button>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} animate-fade-in`}>Next-Gen Dental Tech</div>
          <h1 className={`${styles.title} animate-fade-in delay-1`}>
            Intelligent Care <br />
            <span className="text-gradient">Beyond Limits</span>
          </h1>
          <p className={`${styles.description} animate-fade-in delay-2`}>
            Elevate your dental practice with AI-driven diagnostics, seamless patient management, and stunningly precise imaging. The future of dentistry is here.
          </p>
          <div className={`${styles.heroButtons} animate-fade-in delay-3`}>
            <button className={styles.ctaButton}>Get Started</button>
            <button className={styles.secondaryButton}>Explore Features</button>
          </div>
        </div>
        
        <div className={`${styles.heroVisual} animate-fade-in delay-2`}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/hero.png" 
              alt="Dento AI Platform" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={`${styles.featureCard} glass-panel animate-fade-in delay-1`}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 className={styles.featureTitle}>Smart Analytics</h3>
          <p className={styles.featureDesc}>Predictive AI models help you analyze patient data faster and with unprecedented accuracy.</p>
        </div>

        <div className={`${styles.featureCard} glass-panel animate-fade-in delay-2`}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <h3 className={styles.featureTitle}>3D Imaging</h3>
          <p className={styles.featureDesc}>State-of-the-art rendering techniques provide crystal clear visuals for better diagnostics.</p>
        </div>

        <div className={`${styles.featureCard} glass-panel animate-fade-in delay-3`}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <h3 className={styles.featureTitle}>Patient Portal</h3>
          <p className={styles.featureDesc}>A beautiful, intuitive interface for your patients to schedule, track, and manage their care.</p>
        </div>
      </section>
    </main>
  );
}
