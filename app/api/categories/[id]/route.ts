import { NextRequest, NextResponse } from "next/server";
import schema from "../../../validationSchemas";
import prisma from "@/prisma/client";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  });

  if (!category)
    return NextResponse.json({ error: "Category not found" }, { status: 404 });

  return NextResponse.json({ category });
}


export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {

    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
  
    const category = await prisma.user.findUnique({
      where: { id: params.id },
    });
  
    if (!category)
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    
    const updatedCategory = await prisma.category.update({
      where: { id: category.id },
      data: {
        title: body.title,
        slug: body.slug,
      },
    });
  
    return NextResponse.json(updatedCategory);
  }
  
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
  
    const category = await prisma.user.findUnique({
      where: { id: params.id },
    });
  
    if (!category)
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    //Delete the user
    await prisma.user.delete({
      where: { id: category.id },
    });
    return NextResponse.json({});
    //Return 200
  }