import { sendEmail } from "@/utils/functions/mailer";
import { NextResponse } from "next/server";

type RequestBodyTyp = { name: string; email: string; message: string; type: "contact" | "support" };
export async function POST(req: Request) {
    const { name, email, message, type } = (await req.json()) as RequestBodyTyp;

    if (!name || !email) return new NextResponse("Please include valid request", { status: 400 });
    if (!process.env.EMAIL_USERNAME) return new NextResponse("Sorry we are not ready to take request", { status: 500 });
    const msg = {
        to: process.env.EMAIL_USERNAME,
        subject: type === "contact" ? "Contact Us Request from KEEP ME POSTED" : "Support Request from KEEP ME POSTED",
        text: `
        Name: ${name}\n
        Email: ${email} \n
        Message: ${message}
        `,
    };
    try {
        const emailRes = await sendEmail(msg);
        if (emailRes.status === "success") return NextResponse.json({ status: "success" });
        return new NextResponse("Sorry we couldn't send your message", { status: 500 });
    } catch (err: any) {
        return new NextResponse(err.message, { status: 500 });
    }
}
