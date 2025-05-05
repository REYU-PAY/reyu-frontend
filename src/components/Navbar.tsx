
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import ReyuLogo from './ReyuLogo';
import { WalletConnectButton } from './XellarProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Faucet', path: '/faucet' },
    { name: 'Docs', path: '#', soon: true }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass rounded-2xl max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <ReyuLogo className="h-6 w-6" />
            <span className="font-bold text-xl blue-gradient">REYU</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {location.pathname !== '/' && menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium relative px-3 py-1 rounded-full ${
                  isActive(item.path)
                    ? "text-blue-400 glow-text bg-blue-500/10 border border-blue-500/20"
                    : "text-foreground/70"
                }`}
              >
                {item.name}
                {item.soon && (
                  <span className="absolute -top-2 -right-5 text-xs px-1.5 py-0.5 bg-indigo-500 text-white rounded-full">
                    Soon
                  </span>
                )}
              </Link>
            ))}

            {location.pathname === '/' ? (
              <Button asChild className="bg-blue-500 text-white rounded-full px-6">
                <Link to="/dashboard">Launch App</Link>
              </Button>
            ) : (
              <WalletConnectButton />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button type="button" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 pt-2">
            <div className="flex flex-col space-y-3">
              {location.pathname !== '/' && menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-2 px-3 rounded-lg relative ${
                    isActive(item.path)
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      : "text-foreground/70"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {item.soon && (
                    <span className="absolute top-2 right-3 text-xs px-1.5 py-0.5 bg-indigo-500 text-white rounded-full pulse-hot">
                      Soon
                    </span>
                  )}
                </Link>
              ))}

              {location.pathname === '/' ? (
                <Button asChild className="bg-blue-500 text-white w-full rounded-full mt-2">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)}>Launch App</Link>
                </Button>
              ) : (
                <div className="mt-2">
                  <WalletConnectButton />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
