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
          <div className="avatar" aria-label="Samantha profile photo"><span>SA</span></div>
          <span className="notification">4</span>
        </div>
        <div><h1>Samantha</h1><p>samantha@email.com</p></div>
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
