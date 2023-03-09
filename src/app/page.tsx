'use client';
import Navbar from '../components/Navbar';
import Alret from '@/components/Alret';
import Button from '@/components/Button';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import moment from 'moment';

export default function Home() {
  const [url, seturl] = useState('');
  const [slug, setSlug] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSucces, setIsSucces] = useState(false);
  const [links, setLinks] = useState([]);
  const { data: session } = useSession();

  const getMyLinks = async () => {
    try {
      const result: AxiosResponse = await axios.get('/api/link');
      setLinks(result.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSucces(false);
    try {
      await axios.post('/api/link', {
        url,
        slug,
        publisher: session ? session.user?.email : '',
      });
      setIsSucces(true);
    } catch (error: any) {
      setIsSucces(false);
      setErrorMsg(error.response.data.message);
    }
  };

  const handleDelete = async (slug: string) => {
    try {
      await axios.delete(`/api/link/${slug}`);
      getMyLinks();
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (session) {
      getMyLinks();
    }
  }, [session, isSucces]);

  return (
    <>
      <Navbar />
      <div className="container flex flex-col items-center justify-center gap-16 pt-20 ">
        <div className="w-full md:w-1/2">
          <h1 className="text-xl font-semibold text-center text-zinc-800">Cendhake</h1>
          <p className="mt-5 text-base text-center text-zinc-700">
            Cendhake (Bahasa jawa dari "Pendekin", dibaca <span className="font-mono text-white bg-zinc-700">/tʃɛndhake/</span>) adalah aplikasi shorturl yang memungkinkan pengguna untuk memperpendek tautan yang panjang menjadi lebih
            singkat dan mudah diingat.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          {isSucces && (
            <div className="flex items-center justify-between w-full h-10 px-4 my-4 border border-zinc-800 rounded-3xl">
              <p className="text-base">cendhake.vercel.app/{slug} </p>
              <button type="button" onClick={() => navigator.clipboard.writeText(`https://cendhake.vercel.app/${slug}`)} aria-label="Copy Shorturl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                  />
                </svg>
              </button>
            </div>
          )}

          {String(errorMsg).length !== 0 && <Alret text={errorMsg} />}

          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="w-full">
              <input type="text" className="w-full h-10 px-4 text-base border rounded-3xl border-zinc-800" placeholder="Link panjangmu" value={url} onChange={(e) => seturl(e.target.value)} />
            </div>
            <div className="flex items-center justify-between w-full overflow-hidden bg-zinc-800 rounded-3xl">
              <label className="w-1/2 pl-4 text-base text-white">cendhake.vercel.app/</label>
              <input type="text" className="w-5/12 h-10 px-4 border lg:w-1/2 rounded-r-3xl border-zinc-800" placeholder="Link singkatmu" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
            <div className="flex justify-center w-full">
              <Button type="submit" text="Buat" className="w-1/4 text-white transition-colors bg-zinc-800 hover:bg-zinc-600" ariaLabel="Buat" />
            </div>
          </form>
        </div>
        {session && (
          <div className="w-full overflow-x-scroll rounded-md shadow-md md:overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="font-medium tracking-wide uppercase border-b text-zinc-800 bg-zinc-50 border-zinc-800">
                    <th className="px-6 py-3 text-left">No.</th>
                    <th className="px-6 py-3 text-left">URL</th>
                    <th className="px-6 py-3 text-left">Slug</th>
                    <th className="px-6 py-3 text-left">Created At</th>
                    <th className="px-6 py-3 text-left">Copy</th>
                    <th className="px-6 py-3 text-left">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {links.map((link: Link, index: number) => (
                    <tr key={link.id}>
                      <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">{link.url}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">{link.slug}</td>
                      <td className="px-6 py-4 whitespace-no-wrap">{moment(link.createdAt).format('L')}</td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap">
                        <button type="button" onClick={() => navigator.clipboard.writeText(`https://cendhake.vercel.app/${link.slug}`)} aria-label="Copy">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-no-wrap">
                        <button type="button" onClick={() => confirm('Apakah anda yakin untuk menghapus?') && handleDelete(link.slug)} aria-label="Delete">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className={!session ? 'absolute bottom-0 left-1/2 transform -translate-x-1/2' : 'mt-12'}>
        <p className="text-base text-center">
          Created By{' '}
          <a href="https://instagram.com/this.taufik" target="_blank" className="font-semibold">
            Muhammad Taufik
          </a>
        </p>
      </footer>
    </>
  );
}
