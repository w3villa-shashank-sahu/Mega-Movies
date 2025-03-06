import React from 'react';
import AppBar from '../components/appbar';
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-900 border-5 min-h-screen flex flex-col">
      <AppBar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
