import { NextRequest, NextResponse } from "next/server";
import {categorySchema} from "../../../validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const session = await getServerSession(authOptions);
  if(session?.user.role !== 'NEXTADMIN')
      return NextResponse.json({}, {status: 401});

  const body = await request.json();
  const validation = categorySchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const category = await prisma.category.findUnique({
    where: { slug: params.slug },
  });

  if (!category)
    return NextResponse.json({ error: "Invalid category" }, { status: 404 });

  const updatedCategory = await prisma.category.update({
    where: { slug: category.slug },
    data: {
      title: body.title,
      slug: body.slug,
      img: body.img,
      desc: body.desc,
    },
  });

  return NextResponse.json(updatedCategory);
}
  
export async function DELETE(request: NextRequest, props: {params: Promise<{slug: string}>}) {
  const params = await props.params;

  const session = await getServerSession(authOptions);
  if(session?.user.role !== 'NEXTADMIN')
      return NextResponse.json({}, {status: 401});

  const category = await prisma.category.findUnique({
    where: { slug: params.slug}
  });
  if (!category)
    return NextResponse.json ({ error: "Invalid category" }, { status: 404 });

  await prisma.category.delete({
    where: {slug: category.slug}
  })
  return NextResponse.json({});
}
