import { NextRequest, NextResponse } from 'next/server';
import { postSchema } from '../../../validationSchemas';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function PATCH(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;

  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'NEXTADMIN')
    return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = postSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post)
    return NextResponse.json({ error: 'Invalid post' }, { status: 404 });

  const updatedPost = await prisma.post.update({
    where: { slug: post.slug },
    data: {
      title: body.title,
      slug: body.slug,
      short: body.short,
      desc: body.desc,
      catSlug: body.catSlug,
      status: body.status,
      featured: body.featured,
      userId: body.userId,
      img: body.img,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;

  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'NEXTADMIN')
    return NextResponse.json({}, { status: 401 });

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  if (!post)
    return NextResponse.json({ error: 'Invalid post' }, { status: 404 });

  await prisma.post.delete({
    where: { slug: post.slug },
  });
  return NextResponse.json({});
}
