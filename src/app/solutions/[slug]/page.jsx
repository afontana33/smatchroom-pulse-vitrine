import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('solutions').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('solutions', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const article = readArticle('solutions', slug);
  if (!article) notFound();
  const { default: MdxContent } = await import(`@/content/solutions/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} />
      <Footer />
    </>
  );
}
