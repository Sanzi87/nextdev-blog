import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {categorySchema} from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {

    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});
    const body = await request.json();
    const validation = categorySchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const category = await prisma.category.findUnique({
        where: { slug: body.slug }
    })

    if (category)
        return NextResponse.json({ error: "Category already exists" }, { status: 400});

    const newCategory = await prisma.category.create({
        data: {
            title: body.title,
            slug: body.slug,
            img: body.img,
            desc: body.desc,
        },
    });
    return NextResponse.json(newCategory, { status: 201 });
}