import crypto from 'crypto';

export const generateRandomSlug = () => {
  const slug = crypto.randomBytes(3).toString('hex');

  return slug;
};
