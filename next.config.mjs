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
  /**
   * Le site est passé en page unique. Les anciennes pages produit et segment
   * sont supprimées : chacune redirige en 301 vers l'ancre qui a repris son
   * contenu, pour ne pas perdre le référencement acquis ni casser les liens
   * envoyés en prospection. Ne pas transformer ces 301 en 404.
   */
  async redirects() {
    const gone = [
      ['/sites', '/#piliers'],
      ['/pulse-terrain', '/#piliers'],
      ['/grands-comptes', '/#piliers'],
      ['/entreprises', '/#piliers'],
      ['/entrepreneurs', '/'],
      ['/commerces', '/'],
      ['/artisans', '/'],
      ['/scale', '/'],
      ['/partenaires', '/'],
    ];
    return gone.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default withMDX(nextConfig);
