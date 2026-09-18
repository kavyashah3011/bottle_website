import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenFilmModal?: () => void;
}

export function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenFilmModal
}: NavbarProps) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isVisible, setIsVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // On secondary pages, navbar is always visible
      if (!isHomePage) {
        setIsVisible(true);
        return;
      }

      // On homepage:
      // At the initial top position before scroll starts, navbar is visible
      if (scrollY < 40) {
        setIsVisible(true);
        return;
      }

      // During hero frame animation, navbar disappears until reaching Chapter 01 The Descent (#story)
      const storyEl = document.getElementById('story');
      if (storyEl) {
        const storyTop = storyEl.getBoundingClientRect().top;
        setIsVisible(storyTop <= 120);
      } else {
        setIsVisible(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navLinks = [
    { label: 'HOME', to: '/' },
    { label: 'STORY', to: '/story' },
    { label: 'WATER', to: '/water' },
    { label: 'VESSELS', to: '/products' },
    { label: 'PERFORMANCE', to: '/performance' },
    { label: 'CONCIERGE', to: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled
            ? 'py-3.5 bg-brand-dark/85 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo Mark */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="BOTVOR Homepage"
          >
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover:border-brand-amber transition-colors duration-300">
              <span className="text-xs font-serif-luxury font-bold tracking-widest text-white group-hover:text-brand-amber transition-colors">
                VM
              </span>
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-[0.28em] text-white group-hover:text-white/90">
              BOTVOR
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-widest transition-colors duration-200 relative group py-1 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-brand-amber transition-all duration-300 ${
                        isActive ? 'w-full shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions: Allocation Cart + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Allocation Cart Button */}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-brand-amber/50 transition-all duration-300 text-xs font-semibold tracking-widest text-white"
                aria-label="View Allocation Reserve"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-brand-amber" />
                <span className="hidden sm:inline">ALLOCATION</span>
                <span className="px-1.5 py-0.2 rounded-full bg-brand-amber text-black text-[10px] font-mono font-bold">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Mobile / Tablet Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-2xl flex flex-col justify-center px-10 transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-xs tracking-mega uppercase text-brand-amber">Navigation</span>
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `text-3xl font-light tracking-tight transition-colors ${
                  isActive ? 'text-brand-amber font-normal' : 'text-white/80 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCart) onOpenCart();
              }}
              className="w-full py-4 text-center rounded-full bg-brand-amber text-black font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>VIEW ALLOCATION ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
