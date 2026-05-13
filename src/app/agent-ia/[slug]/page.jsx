import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('agent-ia').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('agent-ia', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function AgentIaArticle({ params }) {
  const { slug } = await params;
  const article = readArticle('agent-ia', slug);
  if (!article) notFound();
  const related = listArticles('agent-ia').filter((a) => a.slug !== article.slug).slice(0, 3);
  const { default: MdxContent } = await import(`@/content/agent-ia/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} related={related} />
      <Footer />
    </>
  );
}
