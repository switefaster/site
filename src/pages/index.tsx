import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function BlackHoleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const draw = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = bounds.width;
      const height = bounds.height;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#030507');
      background.addColorStop(1, '#080503');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      let seed = 1729;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };

      const starCount = Math.min(180, Math.max(70, Math.floor((width * height) / 11000)));
      for (let index = 0; index < starCount; index += 1) {
        const x = random() * width;
        const y = random() * height;
        const radius = 0.25 + random() * 0.85;
        const opacity = 0.12 + random() * 0.42;

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(225, 230, 236, ${opacity})`;
        context.fill();
      }
    };

    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.cosmos} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.starfield} />
      <div className={styles.nebula} />
      <div className={styles.blackHoleSystem}>
        <div className={styles.accretionGlow} />
        <div className={styles.accretionDisk} />
        <div className={styles.accretionDiskInner} />
        <div className={styles.photonRing} />
        <div className={styles.eventHorizon} />
      </div>
      <div className={styles.vignette} />
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <BlackHoleBackground />
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.titleGroup}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={`${siteConfig.title} - ${siteConfig.tagline}`}
      wrapperClassName={styles.home}>
      <HomepageHeader />
    </Layout>
  );
}
