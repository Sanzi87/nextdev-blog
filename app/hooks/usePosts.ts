import prisma from '@/prisma/client';

export type PostStatus = '0' | '1' | undefined;

export const usePosts = async (
  page: number,
  pageSize: number,
  category: string | undefined,
  role: string | null | undefined
) => {
  const where = {
    status: role === 'NEXTADMIN' ? undefined : '1',
    catSlug: category,
  };

  try {
    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const postCount = await prisma.post.count({ where });
    return { posts, postCount };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts.');
  }
};
