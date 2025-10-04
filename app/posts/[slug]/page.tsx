// app/posts/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post, Author, Category } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'posts',
      slug
    }).depth(1)
    
    const post = response.object as Post
    
    if (!post || !post.metadata) {
      return null
    }
    
    return post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  const post = await getPost(slug)
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post não encontrado</h1>
          <p className="text-xl text-gray-600 mb-8">
            Desculpe, não conseguimos encontrar este post.
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
  
  const author = post.metadata?.author as Author | undefined
  const category = post.metadata?.category as Category | undefined
  const featuredImage = post.metadata?.featured_image
  
  return (
    <article className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          {category && (
            <div className="mb-4">
              <Link 
                href={`/categories/${category.slug}`}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white transition-transform hover:scale-105"
                style={{ backgroundColor: category.metadata?.color || '#00A8CC' }}
              >
                {category.title}
              </Link>
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {post.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-600">
            {author && (
              <Link 
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                {author.metadata?.photo && (
                  <img 
                    src={`${author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                )}
                <span className="font-semibold">{author.title}</span>
              </Link>
            )}
            {post.metadata?.publish_date && (
              <time className="text-sm">
                {new Date(post.metadata.publish_date).toLocaleDateString('pt-BR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            )}
          </div>
          
          {/* Featured Image */}
          {featuredImage && (
            <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-auto"
                width={800}
                height={450}
              />
            </div>
          )}
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>
              {post.metadata?.content || ''}
            </ReactMarkdown>
          </div>
          
          {/* Author Bio */}
          {author && author.metadata?.bio && (
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Sobre o autor</h3>
              <div className="flex items-start gap-4">
                {author.metadata?.photo && (
                  <img 
                    src={`${author.metadata.photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-16 h-16 rounded-full flex-shrink-0"
                    width={80}
                    height={80}
                  />
                )}
                <div>
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="font-bold text-lg hover:text-primary transition-colors"
                  >
                    {author.title}
                  </Link>
                  <p className="text-gray-700 mt-2">{author.metadata.bio}</p>
                  {author.metadata?.social_links && (
                    <div className="flex gap-4 mt-3">
                      {author.metadata.social_links.instagram && (
                        <a 
                          href={`https://instagram.com/${author.metadata.social_links.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Instagram
                        </a>
                      )}
                      {author.metadata.social_links.twitter && (
                        <a 
                          href={`https://twitter.com/${author.metadata.social_links.twitter.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Twitter
                        </a>
                      )}
                      {author.metadata.social_links.facebook && (
                        <a 
                          href={`https://facebook.com/${author.metadata.social_links.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-dark"
                        >
                          Facebook
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Back to Home */}
          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              ← Voltar para todos os posts
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}