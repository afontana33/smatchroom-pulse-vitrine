import { notFound } from 'next/navigation';
import { listArticles, readArticle } from '@/lib/content';
import Article from '@/components/Article';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return listArticles('blog').map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = readArticle('blog', slug);
  if (!article) return {};
  return {
    title: article.frontmatter.metaTitle || article.frontmatter.title,
    description: article.frontmatter.metaDescription,
  };
}

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const article = readArticle('blog', slug);
  if (!article) notFound();
  const related = listArticles('blog').filter((a) => a.slug !== article.slug).slice(0, 3);
  const { default: MdxContent } = await import(`@/content/blog/${slug}.mdx`);
  return (
    <>
      <Nav />
      <Article article={article} mdxContent={<MdxContent />} related={related} />
      <Footer />
    </>
  );
}
