export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">🌽</span>
              Festa das Tradições
            </h3>
            <p className="text-gray-300">
              Celebrando a riqueza das tradições nordestinas e nortistas através de histórias, 
              cultura e sabores autênticos.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-accent transition-colors">
                  🎨 Cultura & Arte
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-300 hover:text-accent transition-colors">
                  🎉 Festas & Tradições
                </a>
              </li>
              <li>
                <a href="/" className="text-gray-300 hover:text-accent transition-colors">
                  🍲 Culinária Regional
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Sobre</h3>
            <p className="text-gray-300 mb-4">
              Vamos juntos valorizar nossas tradições, respeitar nossos costumes e transmitir 
              esse legado às novas gerações!
            </p>
            <div className="flex gap-2">
              <span>🎉</span>
              <span>🌺</span>
              <span>💃</span>
              <span>🪗</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p className="text-sm">
            Que a alegria e a esperança nunca nos faltem! ✨
          </p>
        </div>
      </div>
    </footer>
  )
}