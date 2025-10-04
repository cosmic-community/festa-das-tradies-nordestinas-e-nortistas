// app/authors/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post, Author } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'authors',
      slug
    })
    
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.author': authorSlug
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

export default async function AuthorPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const author = await getAuthor(slug)
  
  if (!author) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Autor não encontrado</h1>
          <p className="text-xl text-gray-600 mb-8">
            Desculpe, não conseguimos encontrar este autor.
          </p>
          <Link 
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    )
  }
  
  const posts = await getPostsByAuthor(slug)
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Author Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {author.metadata?.photo && (
                <img 
                  src={`${author.metadata.photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl flex-shrink-0"
                  width={160}
                  height={160}
                />
              )}
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {author.title}
                </h1>
                {author.metadata?.bio && (
                  <p className="text-xl leading-relaxed opacity-95">
                    {author.metadata.bio}
                  </p>
                )}
                {author.metadata?.social_links && (
                  <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
                    {author.metadata.social_links.instagram && (
                      <a 
                        href={`https://instagram.com/${author.metadata.social_links.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                      >
                        📷 Instagram
                      </a>
                    )}
                    {author.metadata.social_links.twitter && (
                      <a 
                        href={`https://twitter.com/${author.metadata.social_links.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                      >
                        🐦 Twitter
                      </a>
                    )}
                    {author.metadata.social_links.facebook && (
                      <a 
                        href={`https://facebook.com/${author.metadata.social_links.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-primary px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                      >
                        👍 Facebook
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Posts Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Posts de {author.title} 📝
          </h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                Este autor ainda não publicou nenhum post.
              </p>
              <Link 
                href="/"
                className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Ver todos os posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
        
        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-block bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}