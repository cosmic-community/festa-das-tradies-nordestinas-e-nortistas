import Link from 'next/link'
import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  if (!categories || categories.length === 0) {
    return null
  }
  
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6">Explore por Categoria</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group"
          >
            <div 
              className="px-6 py-4 rounded-xl text-white font-semibold hover:scale-105 transition-transform duration-200 shadow-lg"
              style={{ backgroundColor: category.metadata?.color || '#00A8CC' }}
            >
              <div className="text-lg mb-1">{category.title}</div>
              {category.metadata?.description && (
                <div className="text-sm opacity-90">
                  {category.metadata.description}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}