import type { ReactNode } from 'react';
import clsx from 'clsx';
// import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={clsx("hero__title", styles.blackholeFont)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.blackholeFont)}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.title} - ${siteConfig.tagline}`}
      wrapperClassName={clsx(styles.blackhole)}>
      <HomepageHeader />
      {/* <main>
      </main> */}
    </Layout>
  );
}
