import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const url = String(req.body.url);

      if (!url.includes('https://')) {
        return res.status(400).json({ message: 'Harus menggunakan https://' });
      }
      try {
        const result = await prisma.link.create({
          data: {
            url: url,
            slug: req.body.slug,
          },
        });
        if (!result) return res.status(400).json({ message: 'Link pendekmu sudah digunakan!' });
        return res.status(201).json(result);
      } catch (error: any) {
        return res.status(400).json({ message: 'Link pendekmu sudah digunakan!' });
      }
    default:
      return res.status(200).json({ message: 'hello world' });
  }
}
