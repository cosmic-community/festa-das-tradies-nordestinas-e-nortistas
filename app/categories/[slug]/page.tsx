// app/categories/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'categories',
      slug
    })
    
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'posts',
        'metadata.category': categorySlug
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

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const category = await getCategory(slug)
  
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Categoria não encontrada</h1>
          <p className="text-xl text-gray-600 mb-8">
            Desculpe, não conseguimos encontrar esta categoria.
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
  
  const posts = await getPostsByCategory(slug)
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div 
            className="inline-block px-6 py-3 rounded-full text-white text-xl font-bold mb-4"
            style={{ backgroundColor: category.metadata?.color || '#00A8CC' }}
          >
            {category.title}
          </div>
          {category.metadata?.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
        </div>
        
        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Nenhum post encontrado nesta categoria ainda.
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