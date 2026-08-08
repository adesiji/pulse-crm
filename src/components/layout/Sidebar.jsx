import React from 'react';
import { NavLink } from 'react-router-dom';
import { PulseDivider } from '../ui/PulseDivider.jsx';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/leads', label: 'Leads' },
  { to: '/deals', label: 'Deals' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/settings', label: 'Settings' },
];

/**
 * Sidebar — fully working navigation shell.
 *
 * NavLink (from react-router-dom) automatically gets an "active" class
 * concept via the `className` render-prop below — this is how Router
 * tells you "this link matches the current URL" without you tracking
 * that in state yourself. That's the Router doing state-like work for
 * free; contrast with the state YOU will manage (search/filter/sort).
 */
export function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div>
        <div className="pulse-logo">Pulse</div>
        <PulseDivider />
      </div>
      <nav>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
