import path from 'node:path';
import createMDX from '@next/mdx';

const withMDX = createMDX({
  options: {
    // Turbopack v16 requires string plugin identifiers (not function refs)
    remarkPlugins: [['remark-frontmatter', ['yaml']], 'remark-gfm'],
    rehypePlugins: ['rehype-slug', ['rehype-autolink-headings', { behavior: 'wrap' }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  turbopack: {
    root: path.resolve('.'),
  },
  async redirects() {
    return [
      {
        source: '/commerces',
        destination: '/entrepreneurs',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
