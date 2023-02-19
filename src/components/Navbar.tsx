'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Button from './Button';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="w-full border-b border-zinc-400">
      <div className="flex container py-2 justify-between items-center ">
        <h1 className="text-2xl font-bold">Cendhake</h1>
        <div className="w-1/2 flex justify-end items-center">
          {session ? (
            <>
              <p className="text-sm px-2 text-center">{session?.user?.name}</p>
              <Button type="button" text="Logout" className="bg-zinc-800 text-white transition-colors hover:bg-zinc-600" onClick={signOut} />
            </>
          ) : (
            <Button type="button" text="Login" className="bg-zinc-800 text-white transition-colors hover:bg-zinc-600" onClick={signIn} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
