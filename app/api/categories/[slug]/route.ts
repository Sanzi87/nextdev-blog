import { NextRequest, NextResponse } from "next/server";
import schema from "../../../validationSchemas";
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
    const validation = schema.safeParse(body);

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
      },
    });
  
    return NextResponse.json(updatedCategory);
  }
  
export async function DELETE(
  request: NextRequest,
  {params}: {params: {slug: string}}) {
    
    const session = await getServerSession(authOptions);
    if(!session)
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
