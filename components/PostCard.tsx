import Link from 'next/link'
import { Post, Author, Category } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author as Author | undefined
  const category = post.metadata?.category as Category | undefined
  
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <div className="relative h-64 overflow-hidden">
            <img 
              src={`${featuredImage.imgix_url}?w=800&h=512&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              width={400}
              height={256}
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        {category && (
          <Link 
            href={`/categories/${category.slug}`}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: category.metadata?.color || '#00A8CC' }}
          >
            {category.title}
          </Link>
        )}
        
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
          {author && (
            <>
              {author.metadata?.photo && (
                <img 
                  src={`${author.metadata.photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full"
                  width={40}
                  height={40}
                />
              )}
              <Link 
                href={`/authors/${author.slug}`}
                className="font-semibold hover:text-primary transition-colors"
              >
                {author.title}
              </Link>
            </>
          )}
          {post.metadata?.publish_date && (
            <time>
              {new Date(post.metadata.publish_date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          )}
        </div>
        
        <Link 
          href={`/posts/${post.slug}`}
          className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  )
}