'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b border-zinc-400">
      <div className="container flex items-center justify-between py-2 ">
        <h1 className="text-2xl font-bold">Cendhake</h1>
        <div className="flex items-center justify-end w-1/2">
          {session ? (
            <>
              <p className="px-2 text-sm text-center">{session?.user?.name}</p>
              <Button type="button" text="Logout" className="text-white transition-colors bg-zinc-800 hover:bg-zinc-600" onClick={signOut} ariaLabel="Logout" />
            </>
          ) : (
            <Button type="button" text="Login" className="text-white transition-colors bg-zinc-800 hover:bg-zinc-600" onClick={signIn} ariaLabel="Login" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
