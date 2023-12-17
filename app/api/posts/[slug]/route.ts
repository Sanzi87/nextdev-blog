import { NextRequest, NextResponse } from "next/server";
import {postSchema} from "../../../validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { slug: string } }
  ) {
    
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});

    const body = await request.json();
    const validation = postSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
  
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
    });
  
    if (!post)
      return NextResponse.json({ error: "Invalid post" }, { status: 404 });
    
    const updatedPost = await prisma.post.update({
      where: { slug: post.slug },
      data: {
        title: body.title,
        slug: body.slug,
        desc: body.desc,
        catSlug: body.catSlug,
        userEmail: body.userEmail
      },
    });
  
    return NextResponse.json(updatedPost);
  }
  
export async function DELETE(
  request: NextRequest,
  {params}: {params: {slug: string}}) {
    
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});
      
    const post = await prisma.post.findUnique({
      where: { slug: params.slug}
    });
    if (!post)
      return NextResponse.json ({ error: "Invalid post" }, { status: 404 });

      await prisma.post.delete({
        where: {slug: post.slug}
      })
      return NextResponse.json({});
  }
