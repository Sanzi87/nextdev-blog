import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
// import {commentSchema} from "../../validationSchemas";
// import { getServerSession } from "next-auth";
// import authOptions from "@/app/auth/authOptions";

export async function GET(request: NextRequest) {

    const tags = "";
    return NextResponse.json(tags);
}
