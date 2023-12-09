import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import urlJoin from 'url-join';
import axios from 'axios';

const Page = () => {
  const router = useRouter();
  const { url } = router.query as { url: string[] };
  const [fullUrl, setFullUrl] = useState('');
  const [shorturl, setShorturl] = useState({
    url: '',
    slug: '',
  });

  const createShortUrl = async (url: string) => {
    try {
      const response = await axios.post('/api/link/generate-random', { url });
      setShorturl(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const joinedUrl = urlJoin(...url);
      const queryParams = new URLSearchParams(router.asPath.split('?')[1]); // Mendapatkan query parameter
      const queryString = queryParams.toString();
      const finalUrl = queryString ? `${joinedUrl}?${queryString}` : joinedUrl;
      setFullUrl(finalUrl);
    }

    if (router.isReady && fullUrl !== '') {
      createShortUrl(fullUrl);
    }
  }, [router.isReady, fullUrl]);
  console.log(fullUrl);
  return (
    <div className="container">
      Generate short url
      <a className="" href={`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/${shorturl.slug}` : `http://localhost:3000/${shorturl.slug}`}`}>
        {`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}/${shorturl.slug}` : `http://localhost:3000/${shorturl.slug}`}`}
      </a>
    </div>
  );
};

export default Page;
