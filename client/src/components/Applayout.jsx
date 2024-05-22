import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';

const AppLayout = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Header />}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
