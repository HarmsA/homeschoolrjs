
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <nav className="main-nav">
        <h2>Project Management</h2>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
