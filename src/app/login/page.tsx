'use client';
import Button from '@/components/Button';
import { useSession, getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push('/');
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Button type="button" text={`Login menggunakan Google`} className="border border-zinc-800 text-zinc-800 font-semibold transition-colors hover:bg-zinc-800 hover:text-white rounded-md" onClick={() => signIn('google')} />
    </div>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: { providers },
  };
}
