import { NextResponse } from 'next/server';

type ProjectCreateProps = { title: string; packageJsonUrl: string };
export async function POST(req: Request) {
    const { title, packageJsonUrl } = (await req.json()) as ProjectCreateProps;
    console.log(title, packageJsonUrl);
    return NextResponse.json({
        status: 'success',
    });
}
