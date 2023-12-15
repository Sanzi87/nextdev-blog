import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export async function GET(request: NextRequest) {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const validation = schema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.errors, { status: 400 });

    const category = await prisma.category.findUnique({
        where: { slug: body.slug }
    })

    if (category)
        return NextResponse.json({ error: "Category already exists" }, { status: 400});

    const newCategory = await prisma.category.create({
        data: {
            title: body.title,
            slug: body.slug
        },
    });
    return NextResponse.json(newCategory, { status: 201 });
}