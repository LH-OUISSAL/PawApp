import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="py-3 shadow-md">
      <nav className="max-w-7xl mx-auto px-6 flex items-center">
        <div className="flex-shrink-0">
          <Link to="/">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </Link>
        </div>
        <div className="ml-6">
          <h1 className="text-3xl font-bold" style={{ color: "#12544C" }}>
            PawApp
          </h1>
        </div>
      </nav>
    </header>
  );
}
