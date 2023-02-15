import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return res.json({ message: 'ok' });
    default:
      return res.json({ message: 'Hello World' });
  }
}
