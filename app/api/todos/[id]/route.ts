import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const ITEMS_PER_PAGE = 10

export async function GET(req: NextRequest) {
    const { userId } = auth()

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
}

export async function POST() {

}