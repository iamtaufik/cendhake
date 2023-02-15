import React from 'react';
import Button from './Button';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-zinc-400">
      <div className="flex container py-2 justify-between items-center ">
        <h1 className="text-2xl font-bold">Cendhake</h1>
        <div>
          {/* <span className="text-sm px-2">Muhammad taufik</span> */}
          <Button type="button" text="Login" className="bg-zinc-800 text-white transition-colors hover:bg-zinc-600" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
