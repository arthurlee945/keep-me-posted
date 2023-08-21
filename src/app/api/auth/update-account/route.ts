import { authOptions } from '@/utils/auth/auth';
import { prisma } from '@/utils/database/prisma';
import { generateRandomToken } from '@/utils/functions/authUtils';
import { sendEmail } from '@/utils/functions/mailer';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'bcryptjs';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) return new NextResponse('Unauthorized', { status: 401 });
    const { email, password, name } = await req.json();
    try {
        //----------------- name update
        let nameField = name ? { name } : {};
        //----------------- email update
        let emailField: {
            email?: string;
            emailVerificationToken?: string;
            emailVerified?: false;
        } = {};
        let emailVerificationToken;
        if (email) {
            const { token, hashedToken } = generateRandomToken();
            emailVerificationToken = token;
            emailField.email = email;
            emailField.emailVerificationToken = hashedToken;
            emailField.emailVerified = false;
        }
        //----------------- password update
        // ! Seperate Password Update into Different route for other builds
        let passwordField: { password?: string } = {};
        if (password) {
            const hashed_password = await hash(password, 12);
            passwordField.password = hashed_password;
        }
        const user = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                ...nameField,
                ...emailField,
                ...passwordField,
            },
            select: {
                id: true,
            },
        });
        if (!user) return new NextResponse('User does not exist', { status: 401 });
        email &&
            sendEmail({
                to: email,
                subject: 'Your email is updated! Please Verify Your Email for Keep Me Posted!',
                text: `
            Please click on link provided to verify your email\n
            ${process.env.APP_URL}/auth/verify-email?token=${emailVerificationToken} \n
            If you didn't update for "Keep Me Posted", please contact us ASAP.
            `,
            });
        return NextResponse.json({
            status: 'successful',
            message: 'update request is successful',
        });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            return new NextResponse('Failed updating server', { status: 500 });
        }
        return new NextResponse('Something went wrong', { status: 500 });
    }
}
