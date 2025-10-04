import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'

async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    const posts = response.objects as Post[]
    
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.publish_date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function Home() {
  const posts = await getPosts()
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🌽 Festa das Tradições Nordestinas e Nortistas ✨
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Celebrando a riqueza de nossas tradições, a força da nossa cultura e a alegria de nosso povo
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-lg">
              <span>🎉 Festas</span>
              <span>🪗 Música</span>
              <span>🍲 Culinária</span>
              <span>💃 Dança</span>
              <span>🎨 Arte</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Últimas Histórias 📝
          </h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Nenhum post encontrado. Volte em breve para mais conteúdo!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Cultural Message Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Vamos Juntos Valorizar Nossas Tradições! 🌺
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              Que os ritmos da nossa terra embalam nossos sonhos e que o calor humano nos envolva, 
              proporcionando momentos de alegria e gratidão.
            </p>
            <p className="text-lg leading-relaxed">
              Respeitar nossos costumes e transmitir esse legado às novas gerações é celebrar a 
              força do nosso povo e a esperança que carrega em seu coração.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}