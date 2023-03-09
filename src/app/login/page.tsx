'use client';
import Button from '@/components/Button';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        type="button"
        text={`Login menggunakan Google`}
        className="font-semibold transition-colors border rounded-md border-zinc-800 text-zinc-800 hover:bg-zinc-800 hover:text-white"
        onClick={() => signIn('google')}
        ariaLabel="Login menggunakan akun Google"
      />
    </div>
  );
}
