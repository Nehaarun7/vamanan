import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Home, BookOpen, Gamepad2, Info, Flower } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/chat', label: 'Chat', icon: MessageCircle },
  { path: '/onam', label: "Vamanan's World", icon: Flower },
  { path: '/story', label: 'Story', icon: BookOpen },
  { path: '/games', label: 'Games', icon: Gamepad2 },
  { path: '/about', label: 'About', icon: Info },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(253,246,227,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 12px rgba(92,61,17,0.12)' : 'none',
        }}
      >
        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '0 16px',
          height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link to="/" aria-label="Vamanan GPT Home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>🪷</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.05rem', color: '#5c3d11', lineHeight: 1.2 }}>
                Vamanan GPT
              </div>
              <div style={{ fontSize: '0.68rem', color: '#b45309', lineHeight: 1 }}>The Clever Little Guide</div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hide-mobile" aria-hidden={isOpen}>
            {navLinks.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  aria-current={active ? 'page' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    padding: '6px 12px', borderRadius: '999px',
                    fontSize: '0.8rem', fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    background: active ? '#f59e0b' : 'transparent',
                    color: active ? '#fff' : '#78350f',
                    boxShadow: active ? '0 2px 8px rgba(212,160,23,0.3)' : 'none',
                  }}
                >
                  <Icon size={13} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            style={{
              display: 'none', // hidden on desktop, shown via media query below
              padding: '8px', borderRadius: '8px',
              background: 'none', border: 'none',
              color: '#78350f', cursor: 'pointer'
            }}
            className="show-mobile-flex"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div style={{
            background: 'rgba(253,246,227,0.97)',
            borderTop: '1px solid rgba(212,160,23,0.2)',
            boxShadow: '0 4px 12px rgba(92,61,17,0.1)',
            paddingBottom: '8px'
          }}>
            {navLinks.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: active ? '#d97706' : '#78350f',
                    background: active ? 'rgba(254,243,199,0.5)' : 'transparent',
                    transition: 'background 0.2s'
                  }}
                >
                  <Icon size={18} />
                  {label}
                  {active && <span style={{ marginLeft: 'auto' }}>🌸</span>}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Mobile hamburger shown via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-flex { display: none !important; }
        }
      `}</style>

      {/* Floating CTA on mobile */}
      {location.pathname !== '/chat' && (
        <Link
          to="/chat"
          aria-label="Talk to Vamanan"
          style={{
            position: 'fixed', bottom: '24px', right: '24px', zIndex: 50,
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '12px 18px', borderRadius: '999px',
            background: 'linear-gradient(135deg, #d4a017, #a07810)',
            color: '#fff', fontSize: '0.82rem', fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(212,160,23,0.4)',
            animation: 'pulse-gold 2s infinite',
          }}
          className="show-mobile-flex"
        >
          <MessageCircle size={16} />
          Talk to Vamanan 🪷
        </Link>
      )}
    </>
  );
};
