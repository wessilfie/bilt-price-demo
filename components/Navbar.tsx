import React from 'react';
import { User, MapPin, Home, CreditCard, LayoutGrid, Plane } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-light tracking-[0.2em] text-white">BILT</span>
        <LayoutGrid className="w-5 h-5 text-gray-400" />
      </div>

      {/* Nav Links - Desktop */}
      <div className="hidden md:flex items-center gap-1 bg-[#1A1D24] rounded-full p-1 border border-white/10">
        <NavItem icon={<LayoutGrid size={16} />} label="For you" />
        <NavItem icon={<Home size={16} />} label="Home" active />
        <NavItem icon={<MapPin size={16} />} label="Neighborhood" />
        <NavItem icon={<Plane size={16} />} label="Rewards" />
        <NavItem icon={<CreditCard size={16} />} label="Wallet" />
      </div>

      {/* User Icon */}
      <div className="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
        <User size={20} className="text-gray-300" />
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-[#2D313A] text-white shadow-sm'
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};