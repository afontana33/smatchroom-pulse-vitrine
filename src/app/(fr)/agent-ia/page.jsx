import { listArticles } from '@/lib/content';
import ArticleCard from '@/components/ArticleCard';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Agent IA : guides, cas d\'usage et coûts — SmatchRoom Pulse',
  description: 'Tout ce qu\'il faut savoir pour comprendre, choisir et déployer un agent IA en entreprise.',
};

export default function AgentIaHub() {
  const articles = listArticles('agent-ia');
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-semibold mb-4">Agent IA</h1>
        <p className="text-neutral-400 mb-16 max-w-2xl">
          Guides pratiques, comparatifs, coûts, cas d'usage : tout ce que vous devez savoir
          pour déployer un agent IA performant dans votre organisation.
        </p>
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
