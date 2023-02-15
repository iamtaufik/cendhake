import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function Slug(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { slug } = req.query;
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

    default:
      return res.status(200).json({ message: 'hello world' });
  }
}
