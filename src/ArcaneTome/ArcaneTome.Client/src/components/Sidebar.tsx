import { useEffect, useRef, useState } from 'react';
import { navItems } from '../services/dashboardData';

type SidebarProps = {
  activeItem: string;
  onSelect: (label: string) => void;
  onLogout: () => void;
};

function Sidebar({ activeItem, onSelect, onLogout }: SidebarProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsProfileMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    onLogout();
  };

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="profile-menu" ref={profileMenuRef}>
        <button className="profile profile-trigger" type="button" aria-expanded={isProfileMenuOpen} aria-haspopup="menu" onClick={() => setIsProfileMenuOpen((open) => !open)}>
          <span className="avatar-wrap">
            <span className="avatar" aria-hidden="true"><span>SA</span></span>
            <span className="notification">4</span>
          </span>
          <span className="profile-copy"><strong>Samantha</strong><span>samantha@email.com</span></span>
          <span className="profile-chevron" aria-hidden="true">⌄</span>
        </button>
        {isProfileMenuOpen && <div className="profile-menu-panel" role="menu"><button type="button" role="menuitem" onClick={handleLogout}><span aria-hidden="true">↪</span> Log out</button></div>}
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button className={activeItem === item.label ? 'active' : ''} key={item.label} onClick={() => onSelect(item.label)} type="button">
            {item.label}
          </button>
        ))}
      </nav>
      <p className="sidebar-footer">THE ARCANE SUITE <span>v. 01</span></p>
    </aside>
  );
}

export default Sidebar;
