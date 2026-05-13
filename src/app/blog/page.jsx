import { listArticles } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Blog — SmatchRoom Pulse',
  description: 'Guides, retours d\'expérience et analyses sur les agents IA en B2B.',
};

export default function BlogIndex() {
  const articles = listArticles('blog');
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-semibold mb-4">Blog</h1>
        <p className="text-neutral-400 mb-16">Guides, analyses, retours terrain.</p>
        {articles.length === 0 ? (
          <p className="text-neutral-500">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
