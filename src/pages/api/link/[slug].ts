import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function Slug(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;
  switch (req.method) {
    case 'GET':
      try {
        const result = await prisma.link.findUnique({
          where: {
            slug: String(slug),
          },
        });

        if (!result) return res.status(404).json({ message: 'Link yang kamu cari tidak ditemukan' });

        return res.status(200).json(result);
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    case 'DELETE':
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ message: 'Tidak terautentikasi' });
      }
      try {
        await prisma.link.delete({
          where: {
            slug: String(slug),
          },
        });
        return res.status(200).json({ message: 'Link berhasil dihapus!' });
      } catch (error: any) {
        return res.status(500).json({ message: error.message });
      }
    default:
      return res.status(200).json({ message: 'hello world' });
  }
}
