import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams;
    console.log(projectId);
    return NextResponse.json({
        status: 'success',
    });
}
