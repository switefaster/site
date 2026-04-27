import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Friends(): ReactNode {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description={`${siteConfig.title} - ${siteConfig.tagline}`}>
            <p>Some neat implementations to be done</p>
            <a href='https://yaossg.com/'>Yaossg</a>
        </Layout>
    );
}