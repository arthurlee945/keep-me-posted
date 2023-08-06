import { NextRequest, NextResponse } from "next/server";

type RecaptchaRequestType = {
    token: string;
};
export async function POST(req: Request) {
    const { token } = (await req.json()) as RecaptchaRequestType;

    if (!token || !process.env.RECAPTCHA_SECRET_KEY)
        return new NextResponse(JSON.stringify({ status: "failed", message: "Token or Key is invalid" }), { status: 400 });
}
