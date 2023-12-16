import { NextRequest, NextResponse } from "next/server";
import schema from "../../../validationSchemas";
import prisma from "@/prisma/client";


// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const category = await prisma.category.findUnique({
//     where: { id: params.id },
//   });

//   if (!category)
//     return NextResponse.json({ error: "Category not found" }, { status: 404 });

//   return NextResponse.json({ category });
// }


export async function PATCH(
    request: NextRequest,
    { params }: { params: { slug: string } }
  ) {

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
