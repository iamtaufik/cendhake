'use client';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

interface Props {
  params: {
    slug: string;
  };
}

function Slug({ params }: Props) {
  const [link, setLink] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const getLink = async (slug: string) => {
    setLoading(true);
    try {
      const result: AxiosResponse<Link> = await axios.get(`/api/link/${slug}`);
      setLoading(false);
      setLink(result?.data?.url);
      setTimeout(() => {
        window.location.href = result.data.url;
      }, 2000);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      setErrorMsg(error?.response?.data.message);
      console.log(errorMsg);
    }
  };

  useEffect(() => {
    getLink(params.slug);
  }, []);
  return <div className="container">{errorMsg !== '' ? <p className="text-red-500">{errorMsg}</p> : <p className="text-zinc-800">{loading ? 'Loading...' : `Redirect to ${link}`}</p>}</div>;
}

export default Slug;
