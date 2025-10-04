import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🌽</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                Festa das Tradições
              </h1>
              <p className="text-xs text-gray-600">
                Nordestinas e Nortistas
              </p>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium"
            >
              Início
            </Link>
            <a 
              href="#sobre"
              className="text-gray-700 hover:text-primary transition-colors font-medium hidden md:block"
            >
              Sobre
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}