import { navItems } from '../services/dashboardData';

type SidebarProps = {
  activeItem: string;
  onSelect: (label: string) => void;
};

function Sidebar({ activeItem, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="profile">
        <div className="avatar-wrap">
          <div className="avatar" aria-label="Mira Vale profile photo"><span>MV</span></div>
          <span className="notification">4</span>
        </div>
        <div><h1>Mira Vale</h1><p>mira@arcane.tome</p></div>
      </div>
      <div className="brand-mark" aria-label="Arcane Tome">A<span>✦</span>T</div>
      <nav className="nav">
        {navItems.map((item) => (
          <button className={activeItem === item.label ? 'active' : ''} key={item.label} onClick={() => onSelect(item.label)} type="button">
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>{item.label}
          </button>
        ))}
      </nav>
      <p className="sidebar-footer">THE ARCANE SUITE <span>v. 01</span></p>
    </aside>
  );
}

export default Sidebar;
