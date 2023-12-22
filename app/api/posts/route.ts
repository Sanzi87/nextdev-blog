import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {postSchema} from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {

    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401});
    const body = await request.json();
    const validation = postSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const post = await prisma.post.findUnique({
        where: { slug: body.slug }
    })

    if (post)
        return NextResponse.json({ error: "Post already exists" }, { status: 400});

    const newPost = await prisma.post.create({
        data: {
            title: body.title,
            slug: body.slug,
            short: body.short,
            desc: body.desc,
            catSlug: body.catSlug,
            userId: body.userId
        },
    });
    return NextResponse.json(newPost, { status: 201 });
}